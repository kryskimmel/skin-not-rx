import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import SearchBarAndFilter from "../NavigationPages/Search/SearchBarAndFIlter";
import { Icon } from "@iconify/react";


function Navigation() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector(state => state.session.user);
  const [expandNav, setExpandNav] = useState(false);

  const handleNavExpansion = () => {
    setExpandNav(!expandNav)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigateTo('/');
  };


  return (
    <>
    {!expandNav ? (
        <div className="nav-container-before">
          <ul className="nav-before-focus">
          <div className='nav-top-before'>
            <li onClick={handleNavExpansion}><Icon icon="charm:menu-hamburger" width={45}/></li>
          </div>
        </ul>
      </div>
      ) : (
        <div className="nav-container-after">
          <ul className="nav-after-focus">
              <div className='nav-top-after'>
                <li onClick={handleNavExpansion}><Icon icon="charm:menu-hamburger" width={45}/></li>
                <li><img src={user.profile_image} alt="profile-img" width={125}/></li>
            </div>
            <div className="nav-center-after">
              <li><Icon icon="ph:magnifying-glass-bold" width={35}/>SEARCH</li>
              <li><Icon icon="fluent:square-16-regular" width={35}/>PRODUCTS</li>
              <li><Icon icon="fluent:squares-nested-20-regular" width={35}/>COLLECTIONS</li>
              <li><Icon icon="fluent:heart-20-filled" width={35}/>FAVORITES</li>
            </div>
            <div className="nav-bottom-after">
              <button className="logout-button" onClick={logout}>LOG OUT</button>
            </div>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navigation;