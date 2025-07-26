import { useState } from 'react';
import { useNavigate } from 'react-router'
import { AuthLayout } from './AuthLayout';

const register = async (name: String, email: String, password: String) => {
  return await fetch('/api/auth/register', {
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
}


export const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        if (res.status == 200) {
          navigate('/login');
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
          aria-label={loading ? "Fazendo cadastro" : "Cadastrar"}
          type="submit">
            {loading ? "Fazendo cadastro" : "Cadastrar"}
        </button>
      </form>
    </AuthLayout>
  )
}
