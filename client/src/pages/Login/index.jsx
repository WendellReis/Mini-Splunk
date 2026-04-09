import './styles.css'
import logo from '../../assets/logo.png'

function Login() {
  return <div>
    <img src={logo} alt="Logo"/>
    <h1>
        Mini-Splunk
    </h1>
    <form>
        <text>Login</text>
        <text>Entre com as suas credencias para acessar o console</text>

        <text>EMAIL</text>
        <input type="text" placeholder="seuemail@email.com"></input>

        <text>SENHA</text>
        <input type="password" placeholder="********"></input>

        <button type="submit">Entrar</button>
    </form>
  </div>
}

export default Login