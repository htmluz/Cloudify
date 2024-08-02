import axios from "axios";
import { SpotifyButton } from '../components/button'

export default function LoginPage() {
  const handleClick = async () => {
		const r = await axios.get("http://localhost:42069/spotify/authorize")
		window.location.href = r.data
  };

	return (
		<div>
			<SpotifyButton label='Login with Spotify' onClick={handleClick} />
		</div>
	)
}
