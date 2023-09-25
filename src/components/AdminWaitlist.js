import { useContext, useState } from "react";
import { UsersContext, WaitlistContext } from "../utils/context";
import { supabase } from "../utils/supabase";


function WaitDisplay() {
  const waitlist = useContext(WaitlistContext);

  async function handleDelete(userid){
    const {data, error} = await supabase.rpc('deletewaitlistuser', {'user_id_input': userid})
    console.log(data, error)
  }
  async function handleMoveDown(position, user_id){
    console.log(user_id)
    const {data, error}= await supabase.rpc('moveUserDownWaitlist', {'current_position': position,'user_id_to_move': user_id})
    console.log(data, error)
  }
  async function handleMoveUp(position, user_id){
    console.log(position, user_id)
    const {data, error}= await supabase.rpc('moveUserUpWaitlist', {'current_position': position,'user_id_to_move': user_id})
    console.log(data, error)
  }

  return (
    <ul className="waitlist">
      {waitlist
        ? waitlist.map((user) => {
            return (
              <li key={user.user_id}>
                <span className="position">{user.position}</span>
                <span>
                  {user.Users.first_name} {user.Users.last_name}
                </span>
                <i className="fa-solid fa-arrow-up"
                  onClick={()=>{
                    handleMoveUp(user.position, user.user_id)
                  }}
                ></i>
                <i className="fa-solid fa-arrow-down"
                  onClick={() => {
                    handleMoveDown(user.position, user.user_id)
                  }}
                ></i>
                <i onClick={() => {handleDelete(user.user_id)}} className="fa-solid fa-trash"></i>
              </li>
            );
          })
        : ""}
    </ul>
  );
}

function WaitSelect() {
  const users = useContext(UsersContext);

  const [selectedUser, setSelectedUser] = useState();
  const [waitError, setWaitError] = useState();

  async function addWaitlistUser(dbInstance, user_id) {
    const { error } = await dbInstance.rpc("addWaitUser", {
      user_id_input: user_id,
    });
    if (error) {
      setWaitError(true);
      console.log(error);
    } else {
      setWaitError(false);
    }
  }
  return (
    <div className="wait-select">
      <h1>User Select</h1>
      <select
        onChange={(e) => {
          const option = e.target.options[e.target.selectedIndex];
          setSelectedUser(option.value);
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
      <button
        onClick={() => {
          addWaitlistUser(supabase, selectedUser);
        }}
      >
        Add User
      </button>
      <p>{waitError ? "An error has occured, check the console" : ""}</p>
    </div>
  );
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
