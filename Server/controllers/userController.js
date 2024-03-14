const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");


const createUser = (req, res) => {
	const { name, email, password } = req.body;
	bcrypt.hash(password, 10)
	.then(hash => {
		UserModel.create({ name, email, password: hash })
		.then(users => res.json(users))
		.catch(err => res.json(err))		
	}).catch(err => console.log(err.message))
}

const login = (req, res) => {
	const { email, password } = req.body;
	UserModel.findOne({ email: email })
	.then(user => {
		if(user){
			bcrypt.compare(password, user.password, (err, response) => {
				if(response){
					const token = jwt.sign({ name: user.name, email: user.email, userID: user._id }, secret, { expiresIn: "1h" });
					res.cookie("token", token);
					res.json("success");
				}else{
					res.json("incorrect password");
				}
			});
		}else{
			res.json("user not found");
		}
	})
}

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logged out successfully' });
}

module.exports = {
	createUser,
	login,
	logout
}
