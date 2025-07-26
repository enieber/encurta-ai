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

export const Menu = ({ isAuthed, navigate }) => {
  return (
    <div className="container">
      <nav>
        <ul>
          <li><a aria-label="Encurta AI" data-discover="true" href="/">Encurta AI</a></li>
        </ul>
        
           <ul>
            { isAuthed && (<li><a href="/dashboard/novo" className="secondary">Novo Link</a></li>)}
            <li><a href="/link" className="secondary">Links</a></li>
            { isAuthed ? (<button onClick={() => {
              logout()
                .then(_res => {
                  navigate("/");
                  console.log('logout')
                })
                .catch(err => {
                  console.warn(err)
                })
            }}>Logout</button>) : (
              <>
            <li><a href="/login" className="secondary">Login</a></li>            
            <li><a href="/register" className="secondary">Register</a></li>
            </>
              )}
          </ul>
        </nav>
      </div>
  )
}

