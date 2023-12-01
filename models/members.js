const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const memberSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

module.exports  = model('Members', memberSchema);