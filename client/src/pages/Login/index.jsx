import './styles.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'

function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user,
          password
        })
      })

      const data = await response.json()

      if (data.success) {
        console.log(data.token)
      } else {
        console.log(data.message)
      }

    } catch (err) {
      console.log('Erro na requisição:', err)
    }
  }

  return <div className="login-container">
    <img src={logo} alt="Logo" className="login-logo" />
    <h1 className="login-title">
      Mini-Splunk
    </h1>
    <form className="login-form" onSubmit={handleLogin}>
      <p className="login-form-title">Autenticação</p>
      <p className="login-form-subtitle">Entre com as suas credencias para acessar</p>

      <p className="login-form-label">USUÁRIO</p>
      <input
        className="login-input"
        type="text"
        placeholder="admin"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <p className="login-form-label">SENHA</p>
      <input
        className="login-input"
        type="password"
        placeholder="••••••••••"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <button className="login-button" type="submit">Login</button>
      </div>
    </form>
  </div>
}

export default Login