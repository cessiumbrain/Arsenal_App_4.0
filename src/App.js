import "./App.css";
import NavMenu from "./components/NavMenu";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext, SpecialContext } from "./utils/context";
import Login from "./components/Login";
import AdminWrapper from "./components/AdminWrapper";
import UserWrapper from "./components/UserWrapper";
import { supabase } from "./utils/supabase";

function App() {
  const [user, setUser] = useState({
    firstName: "Joe",
    admin: true,
  });

  const [specialsList, setSpecialsList] = useState();

  async function fetchSpecials() {
    const { data, error } = await supabase.from("Specials").select("*");
    setSpecialsList(data);
  }

  useEffect(() => {
    fetchSpecials();
    //subscribe to changes in specials
    const Specials = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Specials" },
        (payload) => {
          console.log("Change received!", payload);
          fetchSpecials()
        }
      )
      .subscribe();
      console.log(Specials)
  }, []);

  function logOut() {
    setUser(null);
  }

  if (user) {
    return (
      <UserContext.Provider value={user}>
        <SpecialContext.Provider value={specialsList}>
          <BrowserRouter>
            <div className="App">
              <NavMenu logOut={logOut}></NavMenu>
              {user.admin ? (
                <AdminWrapper></AdminWrapper>
              ) : (
                <UserWrapper></UserWrapper>
              )}
            </div>
          </BrowserRouter>
        </SpecialContext.Provider>
      </UserContext.Provider>
    );
  } else {
    return <Login></Login>;
  }
}

export default App;
