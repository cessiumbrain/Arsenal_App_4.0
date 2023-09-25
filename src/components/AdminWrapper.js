import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminWaitlist from "./AdminWaitlist";
import SpecialSelect from "./SpecialSelect";
import SetVacancy from "./SetVacancy";
import { UsersContext } from "../utils/context";
import { WaitlistContext } from "../utils/context";

import { addWaitlistUser } from "../utils/dbFunctions";

function AdminWrapper(props) {

  //useState
  const [users, setUsers] = useState();
  const [waitlist, setWaitlist] = useState();
  const [specials, setSpecials] = useState();

  
//db functions

  useEffect(() => {
    //initial fetch operations
    async function fetchUsers() {
      const { data, error } = await supabase.from("Users").select("*");
      setUsers(data);
    }
  
    fetchUsers();

    //subscription cleanup
      return 

  }, []);

  return (
    <UsersContext.Provider value={users}>
        <Routes>
          <Route
            path="/admin"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route path="/admin-wait" element={<AdminWaitlist
          addWaitlistUser={addWaitlistUser}

          />} />
          <Route
            path="/special-select"
            element={<SpecialSelect
            specials={specials}></SpecialSelect>}
          />
          <Route path="/set-vacancy" element={<SetVacancy
          changeVacancy={props.changeVacancy}></SetVacancy>} />
        </Routes>
    </UsersContext.Provider>
  );
}

export default AdminWrapper;
