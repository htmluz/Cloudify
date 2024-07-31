import axios from 'axios';

export default async function getSpotifyToken() {
	try {
		const c_id = process.env.CLIENT_ID;
		const c_secret = process.env.CLIENT_SECRET;

		if (!c_id || !c_secret) throw new Error("CLIENT_ID and SECRET must be defined in the environment variables");

		const d = `grant_type=client_credentials&client_id=${c_id}&client_secret=${c_secret}`;
		const r = await axios.post('https://accounts.spotify.com/api/token', d, {
			headers: {
				'Content-type': 'application/x-www-form-urlencoded'
			}
		});
		return r.data.access_token;
	} catch (e) {
		return e;
	}
}
