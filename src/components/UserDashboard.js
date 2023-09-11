import { useContext, useEffect, useState } from "react";
import { SpecialContext } from "../utils/context";

function UserDashboard(props) {
    
    const [activeSpecial, setActiveSpecial] = useState()

    const specialsList = useContext(SpecialContext)
    console.log(specialsList)
  useEffect(() => {
    setActiveSpecial(specialsList.find((special) => special.active));
  });


  return (
    <div className="UserDash">
      <h1>User Dashboard</h1>
      <div className="dash-display">
        <h5>Waitlist Display</h5>
        <span>{props.myPosition ? props.myPosition : "N/A"}</span>
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
