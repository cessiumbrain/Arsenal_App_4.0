import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/context";

function NavMenu(props) {
  const user= useContext(UserContext)
  const [menuOpen, setMenuOpen] = useState(false);

  if(user.admin){
      return (
    <div className="NavMenu">
      <button
        className="open-btn"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        Open
      </button>
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
