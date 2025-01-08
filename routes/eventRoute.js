const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllEvents,
  getAllEventsWithOccurrences,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('./../controllers/eventControllers');
const router = express.Router();

//Routes
router
  .route('/')
  .get(getAllEvents)
  .post(protect, restrictTo('admin', 'superAdmin'), createEvent);

router.use(protect);
router.get(
  '/occurrences',
  restrictTo('admin', 'superAdmin'),
  getAllEventsWithOccurrences
);

router
  .route('/:id')
  .get(getEvent)
  .patch(restrictTo('admin', 'superAdmin'), updateEvent)
  .delete(restrictTo('admin', 'superAdmin'), deleteEvent);

module.exports = router;
