import logo from '../../assets/logo.png'
import '../Login/styles.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FirstLogin() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const apiUrl = import.meta.env.VITE_API_URL

    const navigate = useNavigate()

    function validateCredentials() {
        if (password === '' || confirmPassword === '') {
            setError('Todos os campos devem ser preenchidos')
            return false
        } else if (password.length < 5 || confirmPassword.length < 5) {
            setError('As senhas devem ter mais de 4 caracteres')
            return false
        } else if (password != confirmPassword) {
            setError('As senhas não são iguais')
            return false
        }

        return true
    }

    async function handleFirstLogin(e) {
        e.preventDefault()

        if (!validateCredentials()) {
            return
        }

        try {
            const response = await fetch(`${apiUrl}/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: 'admin',
                    password
                })
            })

            const data = await response.json()
            
            if(data.success) {
                navigate('/login')
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
        <form className="login-form" onSubmit={handleFirstLogin}>
            <p className="login-form-title">Primeiro Acesso</p>
            <p className="login-form-subtitle">Cadastre uma nova senha</p>

            {error && <p className='login-error-message'>{error}</p>}

            <p className="login-form-label">SENHA</p>
            <input
                className="login-input"
                type="password"
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p className="login-form-label">CONFIRME A SENHA</p>
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

export default FirstLogin