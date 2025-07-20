import { useState } from 'react';

const apiGenerateLink = async (link: string) => {
  const res = await fetch('/api/routers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      link,
    }),
    credentials: "include",
  });
  return res.json();
}


export const Main = () => {
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState('');
    
  function newLink(formData) {
    const link = formData.get("link");
    if (link.length > 0) {
      setLoading(true);
      apiGenerateLink(link)
        .then(res => {
          console.log(res)
          const text = `${window.location.origin}/link/${res.hash}`;
          setHash(text)
        })
        .catch(err => {
          console.warn(err)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }


  if (hash) {
    return (
      <main className="container has-table-of-contents page-brand">
        <a  target="_blank" href={`${hash}`}>{`${hash}`}</a>
        <button onClick={() => {          
          navigator.clipboard.writeText(hash)
            .then(() => {
              alert('link copiado')
            })
            .catch(err => {
              console.warn(err)
            })
        }}>Copiar</button>
      </main>
    )
  }

  
  return (
    <main className="container has-table-of-contents page-brand">
        <form action={newLink}>
          <fieldset>
            <label>
              Link
            <input
              name="link"
              aria-describedby="link-helper"
              placeholder="Digite o link para encurtar"
            />
            <small id="link-helper">
              O link precisa ser uma url valida
            </small>
          </label>
        </fieldset>

        <button
          aria-busy={loading}
          aria-label={loading ? "Gerando link…" : "Encurtar"}
          type="submit">
            {loading ? "Gerando link…" : "Encurtar"}
        </button>
      </form>
    </main>
  )
}
