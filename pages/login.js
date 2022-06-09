import { useState } from "react"
import { login } from "../utils/firebaseClient"

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try {
            console.log('login')
            await login(email, password)
        } catch (error) {
            location.reload()
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
