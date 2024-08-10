import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import express from 'express';
import session from 'express-session'
import axios from 'axios';
import cors from 'cors';
import './config/passport-setup'

const app = express();
const PORT = 42069;

app.use(cors({origin: '*'}))

app.use(session({
	secret: 'abc',
}))
app.use(passport.initialize());


app.get('/auth/spotify', passport.authenticate('spotify', {
	scope: [ 
		"user-read-email",
		"user-read-private",
		"user-read-playback-state",
		"streaming",
		"user-modify-playback-state",
		"playlist-modify-public",
		"user-library-modify",
		"user-top-read",
		"playlist-read-collaborative",
		"user-read-currently-playing",
		"playlist-read-private",
		"user-follow-read",
		"user-read-recently-played",
		"playlist-modify-private",
		"user-library-read",
	]
}));

app.get('/auth/spotify/logged', passport.authenticate('spotify'), (req, res) => {
	console.log(req.user)
	res.redirect('http://localhost:5173/')
})

app.listen(PORT, () => {
	console.log(`rodando UwU http://localhost:${PORT}`);
})
