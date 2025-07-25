import { useState } from 'react';

const login = async (username: String, password: String) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  });
  return res.json();
}


export const Login = () => {
  const [loading, setLoading] = useState(false);
    
  function makeLogin(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return;
    }

    setLoading(true);
    login(username, password)
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
              Email
            <input
              name="username"
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
