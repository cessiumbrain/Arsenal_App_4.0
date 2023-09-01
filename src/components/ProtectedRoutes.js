import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import UserDashboard from "./UserDashboard";
import AdminWaitlist from "./AdminWaitlist";
import SpecialSelect from "./SpecialSelect";
import SetVacancy from "./SetVacancy";
import { useContext } from "react";
import { UserContext } from "../utils/context";

function ProtectedRoutes(props) {
  const user = useContext(UserContext)

  if (user.admin) {

    return (
      <Routes>
        <Route
          path="/admin"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
        <Route path="/admin-wait" element={<AdminWaitlist></AdminWaitlist>} />
        <Route
          path="/special-select"
          element={<SpecialSelect></SpecialSelect>}
        />
        <Route
          path="/set-vacancy"
          element={<SetVacancy></SetVacancy>}/>
      </Routes>
    );
  } else {
    return(
       <Routes>
      <Route path="/" element={<UserDashboard></UserDashboard>}></Route>
    </Routes>
    )
   
  }
}
export default ProtectedRoutes;
