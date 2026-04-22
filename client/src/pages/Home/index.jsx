import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import logo from '../../assets/logo.png'

function Home() {
    const apiUrl = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const [logs, setLogs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${apiUrl}/log`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status == 401 || response.status == 403) {
                navigate('/login')
            }

            const data = await response.json()
            if (data.success) {
                setLogs(data.data)
            }

        }
        fetchData()
    }, [])

    return <div className="home-container">
        <div className="home-header">

            <div className='home-main-header'>
                <p className='home-title'>Mini-Splunk</p>

                <div className='home-button-list'>
                    <button className='home-button'>DEBUG</button>
                    <button className='home-button'>INFO</button>
                    <button className='home-button'>WARN</button>
                    <button className='home-button'>ERROR</button>
                    <button className='home-button'>FATAL</button>
                </div>
            </div>

            <div className='home-filter-container'>
                <input
                    className='home-search-bar'
                    type='text'
                    placeholder='Pesquisar logs por mensagem ou fonte...'
                />
                <button className='homer-filter-button'>Sources</button>
            </div>
        </div>
    </div>
}

export default Home