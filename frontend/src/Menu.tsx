export const Menu = () => {
  return (
    <div className="container">
      <nav>
        <a aria-label="Encurta AI" data-discover="true" href="/">Encurta AI</a>
           <ul>
            <li><a href="/dashboard/novo" className="secondary">Novo Link</a></li>
            <li><a href="/link" className="secondary">Links</a></li>
          </ul>
        </nav>
      </div>
  )
}

