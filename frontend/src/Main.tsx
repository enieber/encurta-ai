import { useState } from 'react';

const apiGenerateLink = async (link) => {
  const res = await fetch('/api/routers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      link,
    })
  });
  return res.json();
}


export const Main = () => {
  const [loading, setLoading] = useState(false);
    
  function newLink(formData) {
    const link = formData.get("link");
    if (link.length > 0) {
      setLoading(true);
      apiGenerateLink(link)
        .then(res => {
          console.log(res)          
        })
        .catch(err => {
          console.warn(err)
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
