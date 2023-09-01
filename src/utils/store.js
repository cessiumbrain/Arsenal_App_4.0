import { supabase } from "./supabase"
import { createStoreHook } from "react-redux"

//ACTIONS
const login = ()=>{
    return {
        type: "LOGIN"
    }
}

const logout = ()=>{
    return{
        type: "LOGOUT"
    }
}

const getUsers = () =>{
    return{
        type: "GET_USERS"
    }
}
//REDUCER
const USERS = (state, action) =>{
    switch(action.type){
        case "GET_USERS":

    }
}