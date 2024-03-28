const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY

const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if(!token){
		return res.json("no token");
	}else{
		jwt.verify(token, secret, (err, decoded) => {
			if(err) return res.json("wrong token");
			next();
		});
	}
}

module.exports = {
	verifyToken
}
