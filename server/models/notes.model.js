const { model, Schema } = require("mongoose");

const NotesSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		data: {
			type: String,
			trim: true,
			required: true,
		},
		time: {
			type: String,
			default: new Date()
				.toLocaleString()
				.replace(",", "")
				.replace(/:.. /, " "),
		},
	},
	{ timestamps: true }
);

module.exports = model("notes", NotesSchema);
