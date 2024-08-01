import getSpotifyToken from "../middleware/spotifyAuth";
import { generateRandomString } from "../utils/helpers";
import { Router } from "express";
import axios from "axios";

const router = Router();

// rota que retorna o url pro frontend redirecionar, redirecionar direto daqui deu problema de CORS
router.get('/authorize', (req, res) => {
	const c_id = process.env.CLIENT_ID;
	const scope = 'user-read-private user-read-email';
	const url = `https://accounts.spotify.com/authorize?` +
              `response_type=code&` +
              `client_id=${c_id}&` +
              `scope=${encodeURIComponent(scope)}&` +
              `redirect_uri=http://localhost:42069/spotify/logged&` +
							`state=${generateRandomString(16)}`;
	//TODO: alterar essa bomba de url pra URLParams

	res.send(url);
})

router.get('/logged', (req, res) => {
	const { code, state } = req.query;
	res.send(`:3 ${code} ${state}`);
})

export default router;
