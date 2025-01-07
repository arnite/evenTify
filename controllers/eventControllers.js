const Event = require('../models/eventModel');
const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require('./handlerFactory');

exports.getAllEvents = getAll(Event);
exports.getEvent = getOne(Event);
exports.createEvent = createOne(Event);
exports.updateEvent = updateOne(Event);
exports.deleteEvent = deleteOne(Event);
