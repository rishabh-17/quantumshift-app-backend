const express = require("express");
const PaymentController = require("../controllers/payment.controller");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");


router.post("/create-payment-intent", PaymentController.createPaymentIntent);

module.exports = router;
