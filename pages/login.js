import { useState } from "react"
import { login } from "../utils/firebaseClient"
import AppHead from "../components/appHead"
import NavBar from "../components/navBar"
import HeroLayout from "../components/heroLayout"
import Link from "next/link"

import formCardStyles from "../styles/FormCard.module.css"
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
            <AppHead></AppHead>
            <NavBar></NavBar>
            <HeroLayout>
                <div className="container d-flex align-items-center justify-content-center justify-content-md-start">
                    <form className={formCardStyles.form_card} onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div>
                            <input className="form-control" placeholder="email" type='text' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                            <input className="form-control" placeholder="password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                            <button type="submit" className="btn btn-dark">Login</button>
                        </div>
                        <Link href="/signup"><a className="nav-link">{"Don't have an account?"}</a></Link>
                    </form>
                </div>
            </HeroLayout>
        </div>
    )
}
