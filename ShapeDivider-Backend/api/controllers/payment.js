const mongoose = require('mongoose');
const Payment = require('../models/payment');
const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

// const Admin = require("../models/admin");
const StripeDetails = require('../models/stripeDetails');
// const SquareDetails = require("../models/squareDetails");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
// const SquareConnect = require("square-connect");
// var defaultClient = SquareConnect.ApiClient.instance;
// defaultClient.basePath = "https://connect.squareupsandbox.com";
// var oauth2 = defaultClient.authentications["oauth2"];
// oauth2.accessToken = process.env.SQUARE_SANDBOX_ACCESS_TOKEN;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.user,
		pass: process.env.pass,
	},
});

const silverMonthPakage = 'price_1IbQCKL2QqDUeeFInLLKQuzR';
const premium6MonthPakage = 'price_1IbQCKL2QqDUeeFIUpIYE3TI';
const gold1YearPakage = 'price_1IbQCKL2QqDUeeFIPAihJgrf';
module.exports.addStripeSubscription = async (req, res, next) => {
	const cardNumber = req.body.cardNumber;
	const expMonth = req.body.expMonth;
	const expYear = req.body.expYear;
	const cvc = req.body.cvc;
	const selectedPlan = getPlanId(req.body.selectedPlan);

	let methodId = '';
	let customerId = '';
	let userSubscriptionId = '';
	let planId = selectedPlan;

	// const email = "haseeb129ciit@gmail.com";
	const { password, email, firstName, lastName, companyName, profilePic } = req.body.userObject;
	var today = new Date();
	var hours = String(today.getHours());
	var minutes = String(today.getMinutes());
	var seconds = String(today.getSeconds());
	const time = hours + ':' + minutes + ':' + seconds;
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	const date = mm + '/' + dd + '/' + yyyy;
	let user_id = '';
	let methods = '';
	try {
		methods = await stripe.paymentMethods.create({
			type: 'card',
			card: {
				number: cardNumber || '4242424242424242',
				exp_month: expMonth,
				exp_year: expYear,
				cvc: cvc,
			},
		});
	} catch (err) {
		console.log('Catch Block', err);
		return res.status(400).json({ message: 'invalid Card details' });
	}
	methodId = methods.id;
	const auth = new Auth({
		password: password,
		email: email,
		firstName: firstName,
		lastName: lastName,
		companyName: companyName,
		profilePic: profilePic,
		startedAt: new Date().toDateString(),
	});

	auth.save()
		.then(async (result) => {
			console.log('User object Saved', result);
			user_id = result._id;
		})
		.catch((err) => {
			console.log('Not saved', err);
			res.status(500).json({
				error: err,
			});
		});

	stripe.customers.create(
		{
			payment_method: methods.id,
			email: email,
		},
		function (err, customer) {
			if (err) {
				auth.remove({ _id: user_id })
					.exec()
					.then((result) => {
						console.log('User Deleted', result);

						// res.status(200).json(result);
					})
					.catch((error) => {
						// res.status(500).json({ message: "Sorry could Not Delete" });
						console.log('User NOT deleted', error);
					});

				return res.status(400).json({ error: err, message: 'Something wrong customers Create' });
			}

			console.log('methods.id,customer.id,userSubscription,plan id,userid');
			console.log('This is the created customer', customer);
			const { id } = customer;
			customerId = customer.id;
			stripe.subscriptions.create(
				{
					default_payment_method: methods.id,
					customer: id,
					items: [{ price: selectedPlan }],
				},
				function (err, userSubscription) {
					if (err) {
						auth.remove({ _id: user_id })
							// .exec()
							.then((result) => {
								console.log('User Deleted');
							})
							.catch((error) => {
								console.log('User NOT deleted', error);
							});
						return res.status(400).json({ error: err, message: 'Something wrong' });
					}
					const token = jwt.sign(
						{
							_id: user_id,
							password: password,
							email: email,
							firstName: firstName,
							lastName: lastName,
							companyName: companyName,
							profilePic: profilePic,
						},
						'secret',
						{ expiresIn: '5d' },
					);
					console.log('token', token);
					console.log('userSubscription', userSubscription);
					userSubscriptionId = userSubscription.id;

					console.log();

					const paymentObject = new Payment({
						userId: `${user_id}`,
						userSubscriptionId,
						planId,
						customerId,
						methodId,
					});

					paymentObject
						.save()
						.then(async (result) => {
							console.log('Payment is Saved', result);
						})
						.catch((err) => {
							console.log('Not saved', err);
						});
					return res.status(201).json({
						message: 'sign up successful',
						token: token,
					});
				},
			);
		},
	);
};

const getPlanId = (option) => {
	switch (option) {
		case 'Monthly':
			return silverMonthPakage;
			break;
		case 'Six Months':
			return premium6MonthPakage;
			break;
		case 'Yearly':
			return gold1YearPakage;
			break;
		default:
			return silverMonthPakage;
			break;
	}
};

module.exports.getInvoice = async (req, res, next) => {
	console.log('Invoices ', req.body);
	const { userId } = req.body;
	Payment.findOne({ userId: userId })
		.then(async (foundObject) => {
			if (foundObject) {
				const invoice = await stripe.invoices.list(
					{
						customer: foundObject.customerId,
					},
					function (error, result) {
						if (error) {
							console.log(error);
							return res.status(401).json({
								message: 'Error',
							});
						} else {
							return res.status(200).json({
								list: result,
							});
						}
					},
				);
			} else {
				return res.status(401).json({
					message: 'error',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.getUserSubscription = async (req, res) => {
	const { userId } = req.body;
	try {
		let payment = await Payment.findOne({ userId: userId }).populate('userId');
		if (payment) {
			return res.status(200).json({
				subscription: payment,
			});
		} else {
			return res.status(200).json({
				subscription: [],
			});
		}
	} catch (err) {
		res.status(500).json({
			error: err,
		});
	}
};

module.exports.cancelSubscriptionRequest = async (req, res) => {
	const { id } = req.body;

	try {
		let payment = await Payment.findOne({ userId: id, status: 'active' }).populate('userId');
		if (payment) {
			payment.status = 'Cancel Request';
			let save = await payment.save();
			if (save) {
				var mailOptions = {
					from: process.env.email,
					to: `${process.env.adminEmail}`,
					subject: 'Subscription Cancelation Request',
					html: `
							<h2>There is subscription cancellation reques regard to the user : </h2>
							<p>
							<strong>Name</strong> : <span>${payment.userId.firstName + ' ' + payment.userId.lastName}</span>
							</p>
							<p>
							<strong>Email</strong> : <span>${payment.userId.email}</span>
							</p>
							`,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
						return res.status(200).json({
							message: 'Email not sent',
						});
					} else {
						console.log('Email sent: ' + info.response);
						return res.status(200).json({
							message: 'Cancellation request submitted',
						});
					}
				});
			}
		} else {
			return res.status(400).json({
				message: 'Already requested',
			});
		}
	} catch (err) {
		res.status(500).json({
			error: err,
		});
	}
};
