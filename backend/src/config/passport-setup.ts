import passportSpotify from 'passport-spotify';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../lib/constants';
import passport from 'passport';
import refresh from 'passport-oauth2-refresh';

type OAuthStrategy = Parameters<typeof refresh.use>[0];

const { Strategy: SpotifyStrategy } = passportSpotify;

const SpotifyAuth = new SpotifyStrategy(
	{
		clientID: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_CLIENT_SECRET,
		callbackURL: 'http://localhost:42069/',	
	},
	(accessToken, refreshToken, expires_in, profile, done) => {
		console.log('autenticado', profile)
	},
);

passport.use('spotify', SpotifyAuth);
refresh.use(SpotifyAuth as OAuthStrategy);
