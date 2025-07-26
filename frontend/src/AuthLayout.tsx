import AuthImage from './assets/undraw_authentication_tbfc.svg'

export const AuthLayout = ({ children }) => {
  return (
    <section className="container grid">
      <div className="grid">
        <img
          src={AuthImage}
          alt="Pessoa segurando um circulo com um simbulo de correto para simbolizar autenciação"
          width={200}
          height={200}
        />
      </div>
      <div className="grid">
        {children}
      </div>
    </section>
  )
}
