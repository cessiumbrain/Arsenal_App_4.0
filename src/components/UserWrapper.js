import UserDashboard from "./UserDashboard";
import {Routes, Route} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react'
import { SpecialContext } from "../utils/context";

function UserWrapper() {
  const [myPosition, setMyPosition] = useState()
  
  const [activeSpecial, setActiveSpecial] = useState();
  const specialsList = useContext(SpecialContext)
  
    
  


  return (
    <Routes>
      <Route path="/" element={<UserDashboard
      myPosition={myPosition}
      ></UserDashboard>}></Route>
    </Routes>
  );
}

export default UserWrapper
