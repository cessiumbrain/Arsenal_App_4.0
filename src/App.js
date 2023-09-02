import "./App.css";
import NavMenu from "./components/NavMenu";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { UserContext, UsersContext } from "./utils/context";
import Login from "./components/Login";
import AdminWrapper from "./components/AdminWrapper";
import UserWrapper from "./components/UserWrapper";

function App() {
  const [user, setUser] = useState({
    firstName: 'Joe',
    admin: true,
  });
  const [users, setUsers] = useState([])
  
  if(user){
    return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="App">
          <NavMenu></NavMenu>
          {user.admin ? <AdminWrapper></AdminWrapper> : <UserWrapper></UserWrapper>}
          
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
  } else {
    return (
      <Login></Login>
    )
  }
  
}

export default App;
