import queryString from "query-string"
import { useEffect } from "react"
import axios from "axios";

export default function LogginIn() {

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
