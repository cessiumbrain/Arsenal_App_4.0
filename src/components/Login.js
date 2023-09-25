import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../utils/supabase"

function Login(props){
    const [ email, setEmail] = useState()
    const [ password, setPassword ] = useState()

    async function handleLogin(){
        console.log(email, password)

        const { data, error } = await supabase.auth
        .signInWithPassword({
            email: email,
            password: password,
        })

        if(error){
            console.warn(error)
        }
    
    
        props.setUser(data.user)

    }

    return(
        <div className="Login">
            <h1>Login</h1>
            <label>email</label>
            <input 
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"></input>
            <label>password</label>
            <input
            onChange={(e)=>{setPassword(e.target.value)}}
            type="text"
            ></input>
            <button className="login-button"
            onClick={()=>{handleLogin()}}>Log In</button>
            <span>or</span>
            <Link to="/signup"><button>Sign Up</button></Link>
        </div>
    )
}

export default Login