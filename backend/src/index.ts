import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import express, { Request, Response } from 'express';
import session from 'express-session'
import axios from 'axios';
import cors from 'cors';
import './config/passport-setup'
import * as UserDB from "./db/user"

const app = express();
const PORT = 42069;

app.use(cors({origin: '*'}))

app.use(session({
	secret: 'abc',
	resave: false,
	saveUninitialized: false
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

interface UserProfile {
	id?: string;
	displayName?: string;
}

interface UserRequest extends Request {
	user?: UserProfile;
}

app.get('/auth/spotify/logged', passport.authenticate('spotify'), async (req: UserRequest, res) => {
	if (req.user) {
		if (req.user.id) {
			const token = await UserDB.returnSpotifyToken(req.user.id)
			res.redirect(`http://localhost:5173/?token=${token}`)
		}
	}
})

app.listen(PORT, () => {
	console.log(`rodando UwU http://localhost:${PORT}`);
})
