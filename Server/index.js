const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const { dburl } = require("./config");
const cookieParser = require("cookie-parser");
const { createUser, login, logout } = require("./controllers/userController");
const { verifyToken } = require("./services/auth");

const app = express();
app.use(express.json());
app.use(cors({
	origin: ["http://localhost:5173"],
	methods: ["GET", "POST"],
	credentials: true
}));
app.use(cookieParser());

mongoose.connect(dburl);

app.get('/card', verifyToken, (req, res) => {
	return res.json('success');
});

app.get('/logout', logout);

app.post("/login", login);

app.post('/register', createUser);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});