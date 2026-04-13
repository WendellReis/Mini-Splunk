import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import logo from '../../assets/logo.png'

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function validateCredentials() {
    if(user === '' || password === '') {
      setError('Todos os campos devem ser preenchidos')
      return false
    }
 
    if (password.length < 5) {
      setError('A senha deve ter mais de 4 caracteres')
      return false
    }

    return true
  }

  async function handleLogin(e) {
    e.preventDefault()

    if(!validateCredentials()) {
      return
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
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
        if (data.firstLogin) {
          navigate('/firstLogin')
        } else {
          navigate('/home')
        }
      } else {
        setError(data.message)
      }

    } catch (err) {
      setError(`Erro na requisição: ${error}`)
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

      {error && <p className='login-error-message'>{error}</p>}

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