import dotenv from 'dotenv';
dotenv.config();
import { DEV_URL, DEV_PORT } from './lib/constants';


import passport from "passport";
import express, { Request } from 'express';
import session from 'express-session';
import refresh from 'passport-oauth2-refresh';
import cors from 'cors';
import './config/passport-setup';
import * as UserDB from "./db/user";

const app = express();

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
      const id = req.user.id;
			const token = await UserDB.returnSpotifyToken(req.user.id)
			res.redirect(`http://localhost:5173?id=${id}&token=${token}`)
		}
	}
  else res.redirect(DEV_URL)
})

app.get('/auth/spotify/refreshtoken', async (req: UserRequest, res) => {
  try {
    let id = req.query.id;
    if (id !== undefined) {
      if (id !== 'string') {
        id = String(id)
      }
    }
    if (id) {
      const refresh_token = await UserDB.getRefreshTokenSpotify(id);
      if (refresh_token) {
        refresh.requestNewAccessToken('spotify', refresh_token, async function (err, accesToken, refreshToken) {
          if (err) console.log(err)
          else {
            const b = String(accesToken)
            const c = String(refreshToken)
            const r = await UserDB.updateAccessTokenSpotify(id, b, c)
            res.send(b)
          }
        })
      }
    } 
  } catch {
    res.send(404)
  }
})



app.listen(DEV_PORT, () => {
	console.log(`rodando UwU ${DEV_URL}`);
})

