import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import getSpotifyToken from './middleware/spotifyAuth';

dotenv.config();

const app = express();
const PORT = 42069;


app.get('/', async (req, res) => {
	const token = await getSpotifyToken();
	const h = {
		headers: {
			Authorization: `Bearer ${token}`
		} 
	}	
	const r = await axios.get("https://api.spotify.com/v1/artists/7kJlA28zS73R2HbzBGSbVg", h)
	res.send(r.data);
})

app.listen(PORT, () => {
	console.log(`rodando UwU http://localhost:${PORT}`);
})
