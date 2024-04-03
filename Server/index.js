require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;
const dburl = process.env.DB_URL;
const cookieParser = require("cookie-parser");
const { createUser, login, logout } = require("./controllers/userController");
const { verifyToken } = require("./services/auth");
const { upload } = require("./services/imgStorage");
const { createCard, getCard, getShowCard, updateCard, deleteCard } = require("./controllers/CardController");


const corsOptions = {
	// origin: 'https://digitalbusinesscard3043.netlify.app',
	// credentials: true
	// origin: "http://localhost:5173",
	// credentials: true
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());

mongoose.connect(dburl);

app.get('/', (req, res) => {
	res.json('Hello World!');
});

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

module.exports = app;
