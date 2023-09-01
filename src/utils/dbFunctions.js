export function getUsers(dbInstance){
    return dbInstance.from('Users')
    .select('*')
}