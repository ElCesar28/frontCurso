import React, { useState } from 'react'
const URL = 'http://localhost:8000/login/'

const Login = ({ setSession }) => {

    const [txtRfc, setTxtRfc] = useState('')

    const handleLogin = async () => {
        let response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rfc: txtRfc
            })
        })
        if (response.ok) {
            let data = await response.json()
            setSession(data.usuario)
            console.log(data.message)
        }
    }



    return (
        <div>
            <h1>Login</h1>
            <input
                value={txtRfc}
                onChange={(e) => setTxtRfc(e.target.value)}
                type="text" />
            <button
                onClick={handleLogin}
            >
                Iniciar Sesión
            </button>
        </div>

    )
}

export default Login