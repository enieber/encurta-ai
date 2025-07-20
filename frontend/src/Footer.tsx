export const Footer = () => {
  return (
    <footer className="container">
      <nav className="links">
        <ul>
          <li><strong>About</strong></li>
          <li><a className="secondary" data-discover="true" href="/docs/v2">What’s new?</a></li>
          <li><a className="secondary" data-discover="true" href="/docs/brand" aria-current="page">Brand</a></li>
          <li><a className="secondary" data-discover="true" href="/docs/mission">Mission</a></li>
          <li><a className="secondary" data-discover="true" href="/docs/usage-scenarios">Usage scenarios</a></li>
        </ul>
      </nav>
    </footer>
  )
}
