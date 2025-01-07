const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  createBooking,
  getAllBookings,
  getAllUserBookings,
  addInfo,
  userInfo,
} = require('../controllers/bookingController');
const router = express.Router();

router.use(protect);
router.get('/myBookings', userInfo, getAllUserBookings);

router.route('/').get(getAllBookings);
router.route('/:eventId').post(addInfo, createBooking);
router.route('/:userId').get(getAllUserBookings);

module.exports = router;
