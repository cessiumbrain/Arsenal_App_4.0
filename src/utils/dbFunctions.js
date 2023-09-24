


export async function addWaitlistUser(dbInstance, user_id){
    const {data, error} = await dbInstance.rpc("addWaitUser",{"user_id_input": user_id})
    console.log(data, error)
}

export async function moveDownWaitUser(dbInstance, position_input, user_id_input){
    console.log(position_input, user_id_input)
    const {data, error } = await dbInstance.rpc("moveWaitUserDown", {"position_input": position_input, "user_id_input": user_id_input})
   console.log(`moveDownWaitUser position_input: ${position_input} user_id_input: ${user_id_input} data: ${data} error: ${error}`)
}

export async function moveUserUp(dbInstance, upward_user_id, downward_user_id){
    
}

// export async function createNewDbUser(dbInstance, firstName, lastName){
    
//         console.log(email, password, firstName, lastName)
// }


