const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
	email: {
		type: String,
	},

	firstName: {
		type: String,
	},

	lastName: {
		type: String,
	},

	companyName: {
		type: String,
	},
	phone: {
		type: String,
	},

	password: {
		type: String,
		required: true,
	},

	profilePic: {
		type: String,
	},
	startedAt: {
		type: String,
	},
	downloadedData: {
		type: Object,
	},
	modelDownloaded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'modelSchema' }],
	ocupation: {
		type: String,
	},
	address: {
		type: String,
	},
	aprtment: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	zip: {
		type: String,
	},
	country: {
		type: String,
	},
});

module.exports = mongoose.model('Auth', authSchema);
