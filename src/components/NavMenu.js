import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/context";

function NavMenu(props) {
  const user= useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false);

  if(user.admin){
      return (
    <div 
        onClick={() => {
          setMenuOpen(!menuOpen);
        }} className="NavMenu">
          {menuOpen ? <i class="fa-solid fa-caret-up"></i>: <i class="fa-solid fa-caret-down"></i>}

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
          <li onClick={props.logOut}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
  } else {
    return (
      <></>
    )
  }

}

export default NavMenu;
