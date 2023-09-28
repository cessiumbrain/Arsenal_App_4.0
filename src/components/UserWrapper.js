import UserDashboard from "./UserDashboard";
import Chat from './Chat'
import {Routes, Route} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react'
import { SpecialContext } from "../utils/context";

function UserWrapper() {
  const [myPosition, setMyPosition] = useState()
  
  const [activeSpecial, setActiveSpecial] = useState();
  const specialsList = useContext(SpecialContext)
  
  //join users and waitlist
  


  return (
    <Routes>
      <Route path="/" element={<UserDashboard
      myPosition={myPosition}
      ></UserDashboard>}></Route>
      <Route path="/chat" element={<Chat></Chat>}></Route>
    </Routes>
  );
}

export default UserWrapper
