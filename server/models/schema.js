const mongoose = require("mongoose");

const author = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		userID: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const rating = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		novelId: { type: String, required: true },
		feedback: {
			type: String,
			required: true,
		},
		Rating: {
			type: Number,
			required: true,
		},
		Rating: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{ timestamps: true }
);

const authorModel = mongoose.model("authors", author);
module.exports = authorModel;
