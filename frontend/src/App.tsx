import './App.css'
import { SpotifyButton } from './components/button'
import axios from 'axios';


function App() {
  const handleClick = async () => {
		const r = await axios.get("http://localhost:42069/spotify/authorize")
		window.location.href = r.data
  };

  return (
    <>
      <div>
				<SpotifyButton label='Login with Spotify' onClick={handleClick} />
      </div>
    </>
  )
}

export default App
