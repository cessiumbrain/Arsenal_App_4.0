import { useContext, useEffect, useState } from "react";
import {
  SpecialContext,
  UserContext,
  VacancyContext,
  WaitlistContext,
} from "../utils/context";

function UserDashboard(props) {
  const [activeSpecial, setActiveSpecial] = useState();
  const [userPosition, setUserPosition] = useState();
  const [activeVacancy, setActiveVacancy] = useState();

  const user = useContext(UserContext);
  const specialsList = useContext(SpecialContext);
  const waitlist = useContext(WaitlistContext);
  const vacancy = useContext(VacancyContext);

  useEffect(() => {
    setActiveSpecial(specialsList?.find((special) => special.active));

    if (waitlist) {
      const userPosition = waitlist.find((item) => {
        console.log(item.user_id, user.user_id);
        return item.user_id === user.user_id;
      })?.position;

      setUserPosition(userPosition);
    }
    if (vacancy) {
      setActiveVacancy(
        vacancy.find((item) => {
          return item.active === true;
        })
      );
    }
  }, [specialsList, waitlist, vacancy, user.user_id]);

  return (
    <div className="UserDash">
      <h1>User Dashboard</h1>
      <div className="dash-display">
        <h5>Waitlist Display</h5>
        <p>{userPosition ? userPosition : "N/A"}</p>
      </div>
      <div className="dash-display">
        <h5>Special Display</h5>
        <p>{activeSpecial ? activeSpecial.name : "none"}</p>
      </div>
      <div className="dash-display">
        <h5>Vacancy Display</h5>
        <p>{activeVacancy ? activeVacancy : "?"}</p>
      </div>
    </div>
  );
}

export default UserDashboard;
