const express = require('express');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');

// Middleware to handle raw body for Stripe signature verification
const rawBodyMiddleware = express.raw({ type: 'application/json' });
exports.stripeWebhook = rawBodyMiddleware;

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //Get the current booking & and the event.
  const purchasedBooking = await Booking.findById(req.params.bookingId);
  const event = await Event.findById(purchasedBooking.event);

  if (!purchasedBooking || !event) {
    return next(new AppError('No booking or event found with that ID', 404));
  }

  // Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    customer_email: req.user.email,
    client_reference_id: req.params.bookingId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: event.title,
            description: event.description,
          },
          unit_amount: Math.round(purchasedBooking.totalPrice * 100), // price in cents
        },
        quantity: 1,
      },
    ],
  });

  // Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.handleWebhook = async (req, res, next) => {
  let event;

  try {
    // Verify the Stripe signature
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Find the booking by ID and update its status to 'paid'
      const booking = await Booking.findById(session.client_reference_id);
      if (booking) {
        booking.status = 'confirmed';
        await booking.save();
      }
    } catch (err) {
      return next(new AppError('Failed to update booking status', 500));
    }
  }

  // Respond to Stripe to acknowledge receipt of the event
  res.status(200).json({ received: true });
};
