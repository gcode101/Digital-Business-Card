require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const dburl = process.env.DB_URL;
const cookieParser = require("cookie-parser");
const { createUser, login, logout } = require("./controllers/UserController");
const { verifyToken } = require("./services/auth");
const { upload } = require("./services/imgStorage");
const { createCard, getCard, getShowCard, updateCard, deleteCard } = require("./controllers/CardController");

const app = express();
app.use(cors({
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

mongoose.connect(dburl);

app.get('/logout', logout);

app.post("/login", login);

app.post('/register', createUser);

app.get('/cardAuth', verifyToken, (req, res) => {
	return res.json('success');
});

app.get('/card/:userID', verifyToken, getCard);

app.get('/showCard/:id', getShowCard);

app.post('/card', verifyToken, upload.single('file'), createCard);

app.put('/card/:userID', verifyToken, upload.single('file'), updateCard);

app.delete('/card/:userID', verifyToken, deleteCard);

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});

module.exports = app;