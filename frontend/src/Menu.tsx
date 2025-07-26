async function logout() {
  return await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    }),
  });
}

export const Menu = ({ isAuthed }) => {
  return (
    <div className="container">
      <nav>
        <a aria-label="Encurta AI" data-discover="true" href="/">Encurta AI</a>
           <ul>
            { isAuthed && (<li><a href="/dashboard/novo" className="secondary">Novo Link</a></li>)}
            <li><a href="/link" className="secondary">Links</a></li>
            { isAuthed && (<button onClick={() => {
              logout()
                .then(_res => {
                  console.log('logout')
                })
                .catch(err => {
                  console.warn(err)
                })
            }}>Logout</button>)}
          </ul>
        </nav>
      </div>
  )
}

