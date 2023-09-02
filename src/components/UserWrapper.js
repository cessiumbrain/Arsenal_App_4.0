import UserDashboard from "./UserDashboard";
import {Routes, Route} from 'react-router-dom'

function UserWrapper() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard></UserDashboard>}></Route>
    </Routes>
  );
}

export default UserWrapper
