const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  stripeWebhook,
  getCheckoutSession,
  handleWebhook,
} = require('../controllers/paymentController');
const router = express.Router();

router.post('/webhook', stripeWebhook, handleWebhook);

router.use(protect);
router.get('/checkoutSession/:bookingId', getCheckoutSession);

module.exports = router;
