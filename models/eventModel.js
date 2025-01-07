const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An event must have a title'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'An event must have a description'],
    },
    date: {
      type: Date,
      required: [true, 'An event must have a date'],
    },
    location: {
      type: String,
      required: [true, 'An event must have a location'],
    },
    ticketPrice: {
      type: Number,
      default: 50,
    },
    availableTickets: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
