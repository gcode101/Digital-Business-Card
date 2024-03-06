const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
	picture: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	socialLinks: [{
		type: String
	}],

	about: {
		type: String
	},

	interests: {
		type: String
	},

	footerLinks: [{
		type: String
	}],

	userID: {
		type: mongoose.Schema.Types.ObjectID,
		required: true,
		ref: "user"
	}

});

module.exports = mongoose.model("Card", CardSchema);