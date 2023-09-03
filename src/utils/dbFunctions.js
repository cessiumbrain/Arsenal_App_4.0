export async function addWaitlistUser(dbInstance, user_id){
    const {data, error} = await dbInstance.rpc("addWaitUser",{"user_id_input": user_id})
    console.log(data, error)
}