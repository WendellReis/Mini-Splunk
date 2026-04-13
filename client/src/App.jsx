import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import FirstLogin from './pages/FirstLogin'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/firstLogin" element={<FirstLogin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App