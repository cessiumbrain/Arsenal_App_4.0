import { useContext, useEffect, useState } from "react";
import { UsersContext, WaitlistContext } from "../utils/context";
import {supabase} from '../utils/supabase'

function WaitDisplay(props){
  const waitlist = useContext(WaitlistContext);

  return(
    <ul className="waitlist">
        {waitlist
          ? waitlist.map((user) => {
              return (
                <li key={user.user_id}>
                  <span className="position">{user.position}</span>
                  <span>
                    {user.Users.first_name} {user.Users.last_name}
                  </span>
                  <i className="fa-solid fa-arrow-up"></i>
                  <i className="fa-solid fa-arrow-down"></i>
                  <i className="fa-solid fa-trash"></i>
                </li>
              );
            })
          : ""}
      </ul>
  )
}

function WaitSelect(props){
  const users = useContext(UsersContext);

  const [selectedUser, setSelectedUser] = useState();
  const [waitError, setWaitError] = useState()
  
  async function addWaitlistUser(dbInstance, user_id){
    const {data, error} = await dbInstance.rpc("addWaitUser",{"user_id_input": user_id})
    if(error){
      setWaitError(true)
      console.log(error)
    } else {
      setWaitError(false)
    }
    
}
  return(
    <div className="wait-select">
    <h1>User Select</h1>
      <select
        onChange={(e) => {
          const option = e.target.options[e.target.selectedIndex];
          setSelectedUser(option.value)
        }}
      >
        <option></option>
        {users
          ? users.map((user) => {
              return (
                <option value={user.user_id} key={user.user_id}>
                  {user.first_name}
                </option>
              );
            })
          : ""}
      </select>
      <button onClick={() => {
        addWaitlistUser(supabase, selectedUser)
      }
        }>Add User</button>
        <p>{waitError ? 'An error has occured, check the console' : ''}</p>
    </div>
  )
}
function AdminWaitlist(props) {
  
  return (
    <div className="Admin-Waitlist">
      <h1>Admin Waitlist</h1>
      <WaitDisplay></WaitDisplay>
      <WaitSelect></WaitSelect>
    </div>
  );
}

export default AdminWaitlist;
