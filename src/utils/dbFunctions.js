export function addWaitlistUser(dbInstance, user_id){
    dbInstance.rpc({"user_id": user_id})
}