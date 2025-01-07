const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: [true, 'Booking must belong to an event!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a user!'],
    },
    numberOfTickets: Number,
    totalPrice: {
      type: Number,
      required: [true, 'Booking must have a price.'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
