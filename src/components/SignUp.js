import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase";
import { createNewAuthUser } from "../utils/dbFunctions";
import { Link, useNavigate } from "react-router-dom";

function SignUp(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName ] = useState()

    const navigation = useNavigate()
    //handlesubmit
    async function handleSubmit(){
        //create auth.user
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        console.log(authData, authError)

        const userId = authData.user.id

        
        
        //create public.user

        const { data: dbData, error: dbError } = await supabase
            .from('Users')
            .insert([
            { 
            user_id: userId, 
            first_name: firstName ,
            last_name: lastName,
            },  
            ])
            .select()

            console.log(dbData[0], dbError)
        //set user state
            props.setUser(dbData[0])
            navigation('/')
    }


    return(
        <div className="SignUp">
            
        <div class="container">
        <h1>Signup</h1>
            <label>Email</label>
            <input 
            onChange={(e)=>{setEmail(e.target.value)}}
            type="text"></input>

            <label>Password</label>
            <input 
            onChange={(e)=>{setPassword(e.target.value)}}
            type="text"></input>

            <label>First Name</label>
            <input 
            onChange={(e)=>{setFirstName(e.target.value)}}
            type="text"></input>

            <label>Last Name</label>
            <input
            onChange={(e)=>{setLastName(e.target.value)}}
            type="text"></input>
            

            <button className="signup-button"onClick={()=>{handleSubmit()}}>Sign Up</button>
          
        </div>
                
            <Link to="/"><button class="login-button">Login</button></Link>
        </div>
    )
}

export default SignUp