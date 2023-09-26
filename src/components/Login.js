import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../utils/supabase"

function Login(props){
    const [ email, setEmail] = useState()
    const [ password, setPassword ] = useState()

    async function handleLogin(){

        const { data, error } = await supabase.auth
        .signInWithPassword({
            email: email,
            password: password,
        })

        if(error){
            console.warn(error)
        }
        
        const {data: data2, error: error2} = await supabase.from('Users')
        .select('*')
        .eq('user_id', data.user.id)
        
        if(error2){
            console.warn(error2)
        }
        props.setUser(data2[0])

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
            type="password"
            ></input>
            <button className="login-button"
            onClick={()=>{handleLogin()}}>Log In</button>
            <span>or</span>
            <Link to="/signup"><button>Sign Up</button></Link>
        </div>
    )
}

export default Login