import getSpotifyToken from "../middleware/spotifyAuth";
import { generateRandomString } from "../utils/helpers";
import { Router } from "express";
import axios from "axios";
import { URLSearchParams } from "url";

const router = Router();
const spotify_base_url = "https://accounts.spotify.com/"

// rota que retorna o url pro frontend redirecionar, redirecionar direto daqui deu problema de CORS
router.get('/authorize', (req, res) => {
	const c_id = process.env.CLIENT_ID;
	const c_secret = process.env.CLIENT_SECRET;
	if (!c_id) throw new Error('Erro ao ler .env')
	let a = `${c_id}:${c_secret}`
	a = Buffer.from(a).toString('base64')
	const scope = 'user-read-private user-read-email';
	const url_params = new URLSearchParams({
		response_type: 'code',
		client_id: c_id,
		scope: scope,
		redirect_uri: 'http://localhost:5173/logginIn',
		state: generateRandomString(16)
	})
	const url = `${spotify_base_url}authorize?${url_params}`
	res.send(url);
})

router.post('/getToken', async (req, res) => {
	const code = req.query.code
	const state = req.query.state
	console.log(code)
	const c_id = process.env.CLIENT_ID;
	const c_secret = process.env.CLIENT_SECRET;
	let a = `${c_id}:${c_secret}`
	a = Buffer.from(a).toString('base64')
	if (state && typeof code === 'string') {
		const r = await axios.post('https://accounts.spotify.com/api/token',
																			`code=${code}&redirect_uri=http://localhost:5173/logginIn&grant_type=authorization_code`,
		{
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + a
			}
		});
		console.log(r.data?.error)
	}
})

export default router;
