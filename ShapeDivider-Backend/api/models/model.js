const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
	name: {
		type: String,
	},
	modelId: {
		type: String,
	},
	modelInstruction: {
		type: String,
	},
	description: {
		type: String,
	},
	category: {
		type: String,
	},
	ticket: {
		type: String,
	},

	modelImage: {
		type: String,
	},
});

module.exports = mongoose.model('modelSchema', modelSchema);
