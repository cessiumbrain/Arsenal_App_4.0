import { useContext, useEffect, useState } from "react";
import { SpecialContext, UserContext, WaitlistContext } from "../utils/context";
import { wait } from "@testing-library/user-event/dist/utils";

function UserDashboard(props) {
    const [activeSpecial, setActiveSpecial] = useState()
    const [userPosition, setUserPosition] = useState()
    
    const user = useContext(UserContext)
    const specialsList = useContext(SpecialContext)    
    const waitlist = useContext(WaitlistContext)

    console.log(waitlist)

  useEffect(() => {

    setActiveSpecial(specialsList?.find((special) => special.active));

    const userPosition = waitlist.find(item=>{
      console.log(item.user_id, user.user_id)
      return item.user_id == user.user_id 
    }).position
    console.log(userPosition)

    
  }, [specialsList, WaitlistContext]);


  return (
    <div className="UserDash">
      <h1>User Dashboard</h1>
      <div className="dash-display">
        <h5>Waitlist Display</h5>
        <span>{userPosition ? userPosition : "N/A"}</span>
      </div>
      <div className="dash-display">
        <h5>Special Display</h5>
        <p>{activeSpecial ? activeSpecial.name : 'none'}</p>    
    </div>
      <div className="dash-display">Vacancy Display</div>
      <div className="dash-display"></div>
    </div>
  );
}

export default UserDashboard;
