import queryString from "query-string"
import { useEffect } from "react"
import axios from "axios";
import { useSpotifyAuth } from "../context/AuthContext";

export default function LogginIn() {
	const { access_token, setAccessToken } = useSpotifyAuth();

	const getToken = async (code: string, state: string) => {
		const url_params = new URLSearchParams({
			code: code,
			state: state
		})
		const r = await axios.post(`http://localhost:42069/spotify/getToken?${url_params}`)
		return r.data
	}


	useEffect(() => {
		const fetchToken = async () => {
			const { search } = window.location; 
			const query_params = queryString.parse(search);
			const { code, state } = query_params;
			if (typeof code === 'string' && typeof state === 'string') {
				const token = await getToken(code, state);
				console.log(access_token)
				setAccessToken(token);
				console.log(access_token)
			}
		}
		fetchToken();
	}, [])
		

	return (
		<>
			<h1 className="text-white">Loadin</h1>
		</>
	) 
}
