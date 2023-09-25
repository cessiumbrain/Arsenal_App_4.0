import "./App.css";
import NavMenu from "./components/NavMenu";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserContext,
  SpecialContext,
  VacancyContext,
  WaitlistContext,
} from "./utils/context";
import AdminWrapper from "./components/AdminWrapper";
import UserWrapper from "./components/UserWrapper";
import LoggedOutWrapper from "./components/LoggedOutWrapper";
import { supabase } from "./utils/supabase";

function App() {
  //state
  const [user, setUser] = useState();
  const [waitlist, setWaitlist] = useState();
  const [vacancy, setVacancy] = useState();
  const [specialsList, setSpecialsList] = useState();

  //fetch
  async function fetchSpecials() {
    const { data, error } = await supabase.from("Specials").select("*");

    setSpecialsList(data);
    if(error){
      console.warn(error)
    }
  }
  async function fetchVacancy() {
    const { data, error } = await supabase.from("Vacancy").select("*");
    setVacancy(data);
    if(error){
      console.warn(error)
    }
  }
  async function fetchWaitlist() {
    let { data: Waitlist, error } = await supabase.from("Waitlist").select(`
  *,
  Users (
   *
  )
  `);
  if(error){
    console.warn(error)
  }

    // put the nested object into its containing object so all properties are on the first level

    Waitlist.forEach((item) => {
      item = { ...item, ...item.Users };
      delete item.Users;
    });

    //sort into ascending by position
    Waitlist?.sort((a, b) => {
      return a.position - b.position;
    });

    await setWaitlist(Waitlist);
  }

  //util functions
  function logOut() {
    setUser(null);
    
  }
  //useEffect
  useEffect(() => {

    //initial fetch
    fetchSpecials();
    fetchVacancy();
    fetchWaitlist();

    //subscribe to changes in specials
    const Specials = supabase
      .channel("specials-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Specials" },
        (payload) => {
          console.log("special change:", payload);
          fetchSpecials();
        }
      )
      .subscribe();
    
      console.log("specials subscription", Specials);

    //subscribe to changes in vacancies
    const Vacancy = supabase
      .channel("vacancies-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Vacancy" },
        (payload) => {
          console.log("vacancy change:", payload);
          fetchVacancy();
        }
      )
      .subscribe();
    console.log("vacancies subscription:", Vacancy);

    //subscribe to waitlist changes
    const Waitlist = supabase
      .channel("Waitlist-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Waitlist" },
        (payload) => {
          fetchWaitlist();
        }
      )
      .subscribe();
      console.log("waitlist subscription", Waitlist);
    return;
  }, []);



  async function changeVacancy(newStatusId) {
    if (newStatusId === -1) {
      const { data, error } = await supabase
        .from("Vacancy")
        .update({ active: "false" })
        .eq("active", "true");
      console.log(data, error);
    } else if (newStatusId === 0) {
      console.log("no special selected");
    } else {
      const { data1, error1 } = await supabase
        .from("Vacancy")
        .update({ active: "false" })
        .eq("active", "true");

      const { data2, error2 } = await supabase
        .from("Vacancy")
        .update({ active: "true" })
        .eq("id", newStatusId);
      console.log(data1, data2, error1, error2);
    }
  }

  if (user) {
    return (
      <WaitlistContext.Provider value={waitlist}>
        <UserContext.Provider value={user}>
          <SpecialContext.Provider value={specialsList}>
            <VacancyContext.Provider value={vacancy}>
              <BrowserRouter>
                <div className="App">
                  <NavMenu logOut={logOut}></NavMenu>
                  {user.admin ? (
                    <AdminWrapper changeVacancy={changeVacancy}></AdminWrapper>
                  ) : (
                    <UserWrapper></UserWrapper>
                  )}
                </div>
              </BrowserRouter>
            </VacancyContext.Provider>
          </SpecialContext.Provider>
        </UserContext.Provider>
      </WaitlistContext.Provider>
    );
  } else {
    return <LoggedOutWrapper setUser={setUser}></LoggedOutWrapper>;
  }
}

export default App;
