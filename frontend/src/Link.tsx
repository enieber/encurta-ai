import { useEffect, useState } from "react";
import { useParams } from "react-router";

async function getHash(hash: string) {
  const res = await fetch(`/api/routers/${hash}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "include",   
  })
  return res.json();
}

export const Link = () => {
  let params = useParams();
  let [url, setUrl] = useState('');
  
  useEffect(() => {
    getHash(params.hash)
     .then(res => {
       console.log(res)
       setUrl(res.link)
       setTimeout(() => {
         window.location.href = res.link
//         redirect(url);
       }, 2000)
       console.log(res)       
     })
     .catch(err => {
       console.warn(err)
     })
  }, [params.hash])
       
  return (
    <main className="container has-table-of-contents page-brand">
      <h1>Link</h1>

      {url && (<p>{`Redirecionando ${url}`}</p>) }
    </main>
  )
}
