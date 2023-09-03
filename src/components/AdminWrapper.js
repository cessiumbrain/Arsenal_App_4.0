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

function AdminWrapper() {
  //useState
  const [users, setUsers] = useState();
  const [waitlist, setWaitlist] = useState();

//db functions

  useEffect(() => {
    //initial fetch operations
    async function getUsers() {
      const { data, error } = await supabase.from("Users").select("*");
      setUsers(data);
    }
    async function fetchWaitlist() {
      let { data :Waitlist, error } = await supabase
      .from("Waitlist")
      .select(`
        *,
        Users (
        user_id,
        first_name, last_name
        )`);
        console.log('waitlist:', Waitlist)
        //sort into ascending by position
        Waitlist.sort((a,b)=>{
          return a.position-b.position
        })
      setWaitlist(Waitlist);
    }

    getUsers();
    fetchWaitlist();

    //subscribe to waitlist changes

    // const Waitlist = supabase.channel('custom-all-channel')
    // .on(
    //   'postgres_changes',
    //   { event: '*', schema: 'public', table: 'Waitlist' },
    //   (payload) => {
    //     console.log('Change received!', payload)
    //   }
    // )
    // .subscribe()
    // console.log(Waitlist)

      const Waitlist = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Waitlist" },
        (payload) => {
          fetchWaitlist()
        }
      )
      .subscribe();



    //subscription cleanup

  }, []);

  return (
    <UsersContext.Provider value={users}>
      <WaitlistContext.Provider value={waitlist}>
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
            element={<SpecialSelect></SpecialSelect>}
          />
          <Route path="/set-vacancy" element={<SetVacancy></SetVacancy>} />
        </Routes>
      </WaitlistContext.Provider>
    </UsersContext.Provider>
  );
}

export default AdminWrapper;
