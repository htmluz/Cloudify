import passportSpotify from 'passport-spotify';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../lib/constants';
import passport from 'passport';
import refresh from 'passport-oauth2-refresh';
import { createUser } from '../db/user';
import { loginOrCreate } from '../controller/auth-controller';

type OAuthStrategy = Parameters<typeof refresh.use>[0];

const { Strategy: SpotifyStrategy } = passportSpotify;

passport.serializeUser((user, done) => {
	done(null, user)
})

const SpotifyAuth = new SpotifyStrategy(
	{
		clientID: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_CLIENT_SECRET,
		callbackURL: 'http://localhost:42069/auth/spotify/logged',	
	},
	(accessToken, refreshToken, expires_in, profile, done) => {
		const photos = profile?.photos || [''];
		loginOrCreate(profile.displayName, profile.id, accessToken, refreshToken, photos);
		done(null, profile);
	},
);

passport.use('spotify', SpotifyAuth);
refresh.use(SpotifyAuth as OAuthStrategy);
