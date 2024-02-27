const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const config = require("./config");
const UserModel = require("./models/UserModel");


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.dburl);

app.post("/login", (req, res) => {
	const { email, password } = req.body;
	UserModel.findOne({ email: email })
	.then(user => {
		if(user){
			if(user.password === password){
				res.json("success");
			}else{
				res.json("incorrect password");
			}
		}else{
			res.json("user not found");
		}
	})
});

app.post('/register', (req, res) => {

	UserModel.create(req.body)
	.then(users => res.json(users))
	.catch(err => res.json(err))

});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});