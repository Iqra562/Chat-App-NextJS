'use client'

import axios from 'axios'
import { useState } from 'react'

export default function Login(){
    const [email,setEmail] = useState('');
    const [passowrd, setPassword] = useState('');
    const handleLogin = async ()=>{
        const res = await axios.post("/api/auth/login",{email,passowrd});
        console.log(res.data)

    }
    return(
        <div> 
            <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
            <input type="text" onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}