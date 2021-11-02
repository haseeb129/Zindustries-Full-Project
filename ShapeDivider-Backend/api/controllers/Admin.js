const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Payment = require('../models/payment');
const auth = require('../models/auth');
const saltRounds = 10;
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

module.exports.adminLogin = async (req, res, next) => {
	console.log('LogIN', req.body);
	const email = req.body.email;
	const password = req.body.password;

	Admin.findOne({ email: email })
		.exec()
		.then(async (auth) => {
			if (auth) {
				await bcrypt.compare(password, auth.password, async function (err, newResult) {
					if (err) {
						return res.status(501).json({
							error: err,
						});
					} else {
						if (newResult) {
							const {
								_id,

								email,
							} = auth;

							const token = jwt.sign(
								{
									_id,
									admin: true,
									email,
								},
								'secret',
								{ expiresIn: '5d' },
							);
							return res.status(200).json({
								token: token,
								user: { ...auth.toObject(), password: '' },
							});
						} else {
							return res.status(401).json({
								message: 'invalid password',
							});
						}
					}
				});
			} else {
				res.status(404).json({
					message: 'email invalid',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

module.exports.adminSignup = (req, res, next) => {
	console.log(req.body);
	const { password, email } = req.body;
	var hashp;
	Admin.findOne({ email: email })
		.exec()
		.then(async (authObj) => {
			if (authObj) {
				res.status(403).json({
					message: 'Email already registered',
				});
			} else {
				await bcrypt.hash(password, saltRounds, function (err, hash) {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						hashp = hash;

						const adminObject = new Admin({
							password: hash,
							email: email,
						});

						adminObject
							.save()
							.then(async (result) => {
								console.log('User object Saved', result);

								res.status(201).json({
									message: 'Admin Addded successful',
								});
							})
							.catch((err) => {
								console.log('Not saved');
								res.status(500).json({
									error: err,
								});
							});

						res.status(201).json({
							message: 'Admin Addded successful',
						});
					}
				});
			}
		});
};

module.exports.deleteAndRefund = (req, res, next) => {
	console.log(req.body);
	const { userId } = req.body;
	let refund;
	Payment.findOne({ userId: userId })
		.then(async (obj) => {
			console.log('FOUND OBJECT', obj);

			try {
				// Set proration date to this moment:
				const proration_date = Math.floor(Date.now() / 1000);

				let sub = await stripe.subscriptions.retrieve(obj.userSubscriptionId);
				console.log('SUBS', sub);
				// See what the next invoice would look like with a plan switch
				// and proration set:
				let items = [
					{
						quantity: 0,
						id: sub.items.data[0].id,
						plan: obj.planId, // Switch to new plan
					},
				];
				console.log('Ainvoices--------------------');
				let invoices;
				try {
					invoices = await stripe.invoices.retrieveUpcoming({
						customer: obj.customerId,
						subscription: obj.userSubscriptionId,
						subscription_items: items,
						subscription_proration_date: proration_date,
					});
				} catch (e) {
					return res.status(500).json({ error: 'No subscription' });
				}

				console.log('invoices--------------------', invoices);

				//List all invoices
				let payedInvoicesList = await stripe.invoices.list({
					customer: obj.customerId,
				});

				// Calculate the proration cost:
				let current_prorations = [];
				let cost = 0;
				for (var i = 0; i < invoices.lines.data.length; i++) {
					let invoice_item = invoices.lines.data[i];
					if (invoice_item.period.start == proration_date) {
						current_prorations.push(invoice_item);
						cost += invoice_item.amount;
					}
				}

				//create a refund
				if (cost !== 0) {
					cost = cost < 0 ? cost * -1 : cost; //A positive integer in cents
					console.log('refund', 'gggggggggggggggggggggggggg');
					try {
						refund = await stripe.refunds.create({
							charge: payedInvoicesList.data[0].charge,
							amount: cost,
						});
					} catch (e) {
						res.status(500).json({ error: e });
					}
				}
				if (refund)
					auth.findByIdAndRemove({ _id: userId })
						.then(async (result) => {
							if (result) res.status(200).json({ message: 'Delete Success' });
						})
						.catch((err) => {
							res.status(500).json({ error: err.message });
						});
				console.log('refund', refund);

				// delete subscription
				return stripe.subscriptions.del(obj.userSubscriptionId);
			} catch (e) {
				console.log(e);
			}
		})
		.catch((err) => {
			console.log('err', err);
		});
};

module.exports.cancelSubscription = async (req, res, next) => {
	const { userId } = req.body;

	try {
		let paymnt = await Payment.findOne({ userId: userId });
		if (paymnt) {
			console.log(paymnt);
			const deleted = await stripe.subscriptions.del(paymnt.userSubscriptionId);
			paymnt.status = 'canceled';

			let savePayment = await paymnt.save();
			if (savePayment) {
				res.status(200).json({ message: 'Subscription canceled Successful' });
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: err,
		});
	}
};
