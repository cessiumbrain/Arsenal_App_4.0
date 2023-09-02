import { useContext } from "react";
import { UsersContext, WaitlistContext } from "../utils/context";

function AdminWaitlist(props) {
  const users = useContext(UsersContext);
  const waitlist = useContext(WaitlistContext);
  return (
    <div className="Admin-Waitlist">
      <h1>Admin Waitlist</h1>
      <ul className="waitlist">
        {waitlist
          ? waitlist.map((user) => {
              return(
                 <li>
                    <span>
                        {user.Users.first_name} {user.Users.last_name}
                    </span>
                    <i class="fa-solid fa-arrow-up"></i>
                    <i class="fa-solid fa-arrow-down"></i>
                    <i class="fa-solid fa-trash"></i>
                </li>
              )

            })
          : ""}
      </ul>
      <h1>User Select</h1>
      <select onChange={(e)=>{console.log(e.target.value)}}>
        {users
          ? users.map((user) => {
              return <option key={user.user_id}>{user.first_name}</option>;
            })
          : ""}
      </select>
      <button onClick={()=>{}}>Add User</button>
    </div>
  );
}

export default AdminWaitlist;
