const CardModel = require("../models/CardModel");
const UserModel = require("../models/UserModel");

const createCard = (req, res) => {
	const { 
		picture,
		name,
		title,
		socialLinks,
		about,
		interests,
		footerLinks,
		userID 
	} = req.body;

	const card = new CardModel({
		picture,
		name,
		title,
		socialLinks,
		about,
		interests,
		footerLinks,
		userID 
	});

	card.save()
		.then((savedCard) => {
			res.status(200).send(savedCard);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
}

module.exports = {
	createCard
}