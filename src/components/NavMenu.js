import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/context";
import { useNavigate } from "react-router-dom";

function NavMenu(props) {
  const user= useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate()

  if(user.admin){
      return (
    <div 
        onClick={() => {
          setMenuOpen(!menuOpen);
        }} className="NavMenu">
          {menuOpen ? <i className="fa-solid fa-caret-up"></i>: <i className="fa-solid fa-caret-down"></i>}

      <div className={`dropdown ${menuOpen ? "open" : "closed"}`}>
        <ul>
            <li>
                <Link to="/admin">
                    Dashboard
                </Link>
            </li>
          <li>
            <Link to="/admin-wait">
                Set Waitlist
            </Link>
          </li>
          <li>
            <Link to="/special-select">
            Set Special
            </Link>
          </li>
          <li>
            <Link to="/set-vacancy">
                Set Vacancy
            </Link>
          </li>
          <li onClick={()=>{
            navigate('/')
            props.logOut()
            }}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
  } else {
    return (
      <div 
      onClick={() => {
        setMenuOpen(!menuOpen);
      }} className="NavMenu">
        {menuOpen ? <i className="fa-solid fa-caret-up"></i>: <i className="fa-solid fa-caret-down"></i>}

    <div className={`dropdown ${menuOpen ? "open" : "closed"}`}>
      <ul>
        <li onClick={()=>{
          navigate('/')
          props.logOut()}}>
          Logout
        </li>
      </ul>
    </div>
  </div>
    )
  }

}

export default NavMenu;
