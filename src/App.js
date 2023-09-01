import "./App.css";
import NavMenu from "./components/NavMenu";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserContext, UsersContext } from "./utils/context";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState({
    admin: false,
  });
  const [users, setUsers] = useState([])
  
  if(user){
    return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="App">
          <NavMenu></NavMenu>
          <ProtectedRoutes></ProtectedRoutes>
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
