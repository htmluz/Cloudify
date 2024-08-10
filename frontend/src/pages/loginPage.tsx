import { SpotifyButton } from '../components/button'
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const handleClick = async () => {
		window.location.href = 'http://localhost:42069/auth/spotify';
  };

	return (
		<div>
			<SpotifyButton label='Login with Spotify' onClick={handleClick} />
		</div>
	)
}
