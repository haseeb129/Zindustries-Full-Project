const mongoose = require('mongoose');
const paymentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Auth',
		required: true,
	},

	status: {
		type: String,
		required: true,
		default: 'active',
	},

	methodId: {
		type: String,
	},
	customerId: {
		type: String,
	},
	userSubscriptionId: {
		type: String,
	},

	planId: {
		type: String,
	},

	// paymentId: {
	//   type: String,
	//   required: true,
	// },

	// mode: {
	//   type: String,
	//   required: true,
	// },

	// date: {
	//   type: String,
	//   required: true,
	// },
	// type: {
	//   type: String, //"monthlyRecurring ||weeklyRecurring || OneTime"
	//   required: true,
	// },

	// time: {
	//   type: String,
	//   required: true,
	// },

	// description: {
	//   type: String,
	//   required: true,
	// },

	// amount: {
	//   type: Number,
	//   required: true,
	// },

	// status: {
	//   type: String,
	//   required: true,
	// },

	// auth: {
	//     type: mongoose.Schema.Types.ObjectId,
	//     ref: 'Auth',
	// },

	// organization: {
	//     type: mongoose.Schema.Types.ObjectId,
	//     ref: 'Admin',
	//     required: true
	// }
});

module.exports = mongoose.model('Payment', paymentSchema);
