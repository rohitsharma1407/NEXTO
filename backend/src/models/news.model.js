const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		url: { type: String },
		source: { type: String },
		category: { type: String },
		location: { type: String },
		language: { type: String },
		publishedAt: { type: Date },
		summary: { type: String },
		imageUrl: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
