import Login from "./Login";
import SignUp from "./SignUp";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function LoggedOutWrapper(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <Login
                setUser={props.setUser}
            ></Login>
        }></Route>
        <Route path="/signup" element={
            <SignUp
                setUser={props.setUser}
            ></SignUp>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default LoggedOutWrapper;
