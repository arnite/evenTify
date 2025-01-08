const Event = require('../models/eventModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const { fetchEvents } = require('../utils/recurrenceUtils');

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require('./handlerFactory');

exports.getAllEventsWithOccurrences = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(new AppError('Both startDate and endDate are required', 400));
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const events = await fetchEvents(start, end);

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: events,
  });
});

exports.getAllEvents = getAll(Event);
exports.getEvent = getOne(Event);
exports.createEvent = createOne(Event);
exports.updateEvent = updateOne(Event);
exports.deleteEvent = deleteOne(Event);
