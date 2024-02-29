import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import { NavLink } from "react-router-dom";
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
                <li onClick={handleNavExpansion}><Icon icon="ion:caret-back" width={45}/></li>
                <li><h2>{user.username}</h2></li>
                <NavLink to={'/'}><img src={user.profile_image} alt="profile-img" width={125}/></NavLink>
            </div>
            <div className="nav-center-after">
              <li className='nav-item' style={{margin:'0px'}}><Icon icon="fluent:search-20-regular" width={35}/>SEARCH</li>
              <NavLink to={'/users/current/products'} className='nav-item'><Icon icon="fluent:square-20-regular" width={35}/>PRODUCTS</NavLink>
              <NavLink to={'/users/current/collections'} className='nav-item'><Icon icon="fluent:squares-nested-20-regular" width={35}/>COLLECTIONS</NavLink>
              <NavLink className='nav-item'><Icon icon="fluent:heart-20-regular" width={35}/>FAVORITES</NavLink>
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