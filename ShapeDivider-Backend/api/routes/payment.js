const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const block = require('../middleware/block');
// router.get('/getByOrganization/:id',paymentController.getByOrganization);
// router.get('/getByCustomer/:id', paymentController.getByCustomer);
// router.post("/addStripeOneTime/:id", paymentController.addStripeOneTime);
router.post('/addStripeSubscription', paymentController.addStripeSubscription);
router.post('/getinvoice', paymentController.getInvoice);
router.post('/getUserSubscription', paymentController.getUserSubscription);
router.post('/cancelSubscriptionRequest', paymentController.cancelSubscriptionRequest);
// router.post('/addSquareOneTime/:id',paymentController.addSquareOneTime);
// router.post('/addUserPayment/:id',paymentController.addUserPayment);

module.exports = router;
