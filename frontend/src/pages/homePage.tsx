import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function HomePage() {
  const { spotify_id, spotify_access_token, login, setSpotifyTokenOnly } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMe = async () => { //TODO: Ajustar esse axios pra virar um utils
    try {
      const r = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${spotify_access_token}`
        }
      })
      setData(r.data);
    } catch (error) {
      if (error.response.status === 401) {
        const newtoken = await axios.get(`http://localhost:42069/auth/spotify/refreshtoken?id=${spotify_id}`)
        setSpotifyTokenOnly(newtoken.data)
      }
    }
  } 

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const id = url.searchParams.get('id');
      if (token && id) {
        login(token, id)
      }
      url.searchParams.delete("token");
      url.searchParams.delete("id");
      window.history.replaceState({}, document.title, url)
    }
    fetchData();
    setLoading(false)
  }, [])


  return (
    <>
      <div>
        <div>
          <div className='text-white'>{spotify_id} {spotify_access_token}</div>
          <button className='text-white' onClick={getMe}>B</button>

        </div>
        <div className='text-white'>
          <div className='text-white'>{JSON.stringify(data, null, 2)}</div>
          <img src={data?.images[0].url} />
        </div>
      </div>
      <h1 className="text-white">Hiii</h1>
    </>
  ) 
}
