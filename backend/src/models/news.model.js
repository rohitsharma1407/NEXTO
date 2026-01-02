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
		// User-generated news fields
		isUserGenerated: { type: Boolean, default: false },
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		authorName: { type: String },
		isLocal: { type: Boolean, default: false },
		isApproved: { type: Boolean, default: false },
		views: { type: Number, default: 0 },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		comments: [{
			user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
			userName: String,
			text: String,
			createdAt: { type: Date, default: Date.now }
		}],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
