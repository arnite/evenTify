const Booking = require('./../models/bookingModel');
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { getAll } = require('./handlerFactory');

exports.addInfo = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.event = req.params.eventId;
  next();
});
exports.userInfo = catchAsync(async (req, res, next) => {
  req.params.userId = req.user.id;
  next();
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const { user, event, numberOfTickets } = req.body;

  //Query database for event and user
  const purchaser = await User.findById(user);

  const purchasedEvent = await Event.findById(event);
  if (!purchasedEvent || !purchaser) {
    return next(new AppError('Event or User not found', 404));
  }

  if (purchasedEvent.availableTickets < numberOfTickets) {
    return next(new AppError('Not enough tickets available', 400));
  }

  //Create new Booking
  const totalPrice = purchasedEvent.ticketPrice * numberOfTickets;

  const booking = new Booking({
    event,
    user,
    numberOfTickets,
    totalPrice,
  });

  await booking.save();

  //Reduce available tickets
  purchasedEvent.availableTickets -= numberOfTickets;
  await purchasedEvent.save();

  //Send notification to user's email.
  try {
    await sendEmail({
      email: purchaser.email,
      subject: 'Booking confirmed.',
      message: 'Your booking has been confirmed',
    });
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Try again later!')
    );
  }

  res.status(201).json({
    status: 'Booking successful',
    data: booking,
  });
});

exports.getAllBookings = getAll(Booking);
exports.getAllUserBookings = getAll(Booking);
