import { useNavigate } from 'react-router'
import { useState } from 'react';
import { AuthLayout } from './AuthLayout';

const login = async (username: String, password: String) => {
  return await fetch('/api/auth/login', {
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
}


export const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  function makeLogin(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return;
    }

    setLoading(true);
    login(username, password)
      .then(res => {
        if (res.status == 200) {
          navigate('/');
        }
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
    <AuthLayout>
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
    </AuthLayout>
  )
}
