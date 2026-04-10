import './styles.css'
import logo from '../../assets/logo.png'

function Login() {
  return <div className="login-container">
    <img src={logo} alt="Logo" className="login-logo"/>
    <h1 className="login-title">
        Mini-Splunk
    </h1>
    <form className="login-form">
        <p className="login-form-title">Autenticação</p>
        <p className="login-form-subtitle">Entre com as suas credencias para acessar</p>

        <p className="login-form-label">EMAIL</p>
        <input className="login-input" type="text" placeholder="seuemail@email.com"></input>

        <p className="login-form-label">SENHA</p>
        <input className="login-input" type="password" placeholder="••••••••••"></input>

        <div>
          <button className="login-button" type="submit">Login</button>
        </div>
    </form>
  </div>
}

export default Login