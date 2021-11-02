const express = require('express');

const router = express.Router();

const adminController = require('../controllers/Admin');
const middleware = require('../middleware/block');

router.post('/login', adminController.adminLogin);

router.post('/signup', adminController.adminSignup);

router.post('/cancelSubscription', adminController.cancelSubscription);

router.post('/deleteAndRefund', adminController.deleteAndRefund);

// router.post("/forgetPassword", authController.forgetPassword);

module.exports = router;
