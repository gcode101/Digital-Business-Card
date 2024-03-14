const CardModel = require("../models/CardModel");

const createCard = (req, res) => {
	const { 
		name,
		title,
		socialLinks,
		about,
		interests,
		footerLinks,
		userID 
	} = req.body;

	const picture = req.file;

	const picturePath = picture.path.replace(/^public\//, '');

	const card = new CardModel({
		picture: picturePath,
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
            if (err.response) {
                console.error("Server responded with status code:", err.response.status);
                console.error("Error message:", err.response.data);
                res.status(err.response.status).send(err.response.data);
            } else if (err.request) {
                console.error("No response received:", err.request);
                res.status(500).send("No response received from the server. Please try again later.");
            } else {
                console.error("Request setup error:", err.message);
                res.status(500).send("An error occurred while setting up the request. Please try again later.");
            }
        });
}

const getCard = (req, res) => {
	const { userID } = req.params;
	CardModel.findOne({ userID })
	.then(card => {
		if(!card){
			return res.status(404).json({ message: 'Card not found' })
		}
		res.json(card);
	})
	.catch(error => { 
		console.error('Error finding card:', error);
		res.status(500).json({ message: 'Internal server error' });
	});
}

module.exports = {
	createCard,
	getCard
}