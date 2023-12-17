import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import ExploreButton from "./ExploreButton";

function Navigation() {
  return (
    <div className="nav-container">
      <ul className="nav-left">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <ul className="nav-right">
        <li>
          <ExploreButton />
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>


    </div>
  );
}

export default Navigation;
