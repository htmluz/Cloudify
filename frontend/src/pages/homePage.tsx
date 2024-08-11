import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  let token: string | null = '';
  const location = useLocation();
  const navigate = useNavigate();

  const getMe = async (t: string | null) => {
    const r = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${t}`
      }
    })
    return r.data;
  } 

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      token = url.searchParams.get('token');
      console.log(token);
      if (token) {
        const userData = await getMe(token);
        setData(userData);
        setLoading(false);
      }
      url.searchParams.delete("token");
    }

    fetchData();

  }, [])

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
          ) : (
            <div>
              <div className='text-white'>{JSON.stringify(data, null, 2)}</div>
              <div className='flex justify-center'>
                <img src={data.images[0].url} />
              </div>
            </div>
          )}
      </div>
      <h1 className="text-white">Hiii</h1>
    </>
  ) 
}
