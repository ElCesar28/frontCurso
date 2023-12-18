import React, { useState } from 'react'
import App from '../pages/App.jsx'
import Login from './Login.jsx'

const Router = () => {

    const [session, setSession] = useState(null)

    return (
        <>
            {
                session ? 
                <App 
                    session={session}
                    setSession={setSession}
                /> : 
                <Login setSession={setSession}/>
            }
        </>
    )
}

export default Router