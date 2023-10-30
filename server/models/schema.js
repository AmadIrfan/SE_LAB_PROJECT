import mongoose from "mongoose";

const user = new mongoose.Schema(
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
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		isSupperAdmin: {
			default: false,
			required: true,
			type: Boolean,
		},
		active: {
			default: true,
			required: true,
			type: Boolean,
		},
		profileImage: {
			required: true,
			type: String,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.Schema("user", user);
