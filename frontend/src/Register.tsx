import { useState } from 'react';

const register = async (name: String, email: String, password: String) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  return res.json();
}


export const Register = () => {
  const [loading, setLoading] = useState(false);
    
  function makeLogin(formData) {
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    if (!email || !password || !name) {
      return;
    }

    setLoading(true);
    register(name, email, password)
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

  return (
    <main className="container has-table-of-contents page-brand">
        <form action={makeLogin}>
          <fieldset>
            <label>
              Nome
            <input
              name="name"
              type="text"
              placeholder="Digite seu nome"
            />
          </label>
            <label>
              Email
            <input
                name="email"
              type="email"
              placeholder="Digite seu email"
            />
          </label>
          <label>
              Senha
            <input
              name="password"
              type="password"
              placeholder="Digite sua Senha"
            />
          </label>
        </fieldset>

        <button
          aria-busy={loading}
          aria-label={loading ? "Fazendo login…" : "Login"}
          type="submit">
            {loading ? "Fazendo login…" : "Login"}
        </button>
      </form>
    </main>
  )
}
