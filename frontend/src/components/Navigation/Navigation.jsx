import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import SearchBarAndFilter from "../NavigationPages/Search/SearchBarAndFIlter";
import { Icon } from "@iconify/react";


function Navigation() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector(state => state.session.user);
  const [expandNav, setExpandNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  const navRef = useRef();


  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigateTo('/');
  };

  const handleNavExpansion = () => {
    setExpandNav(!expandNav)
  };

  const handleSearch = (e) => {
    e.stopPropagation();
    setShowSearch(!showSearch);
    handleNavExpansion();
  };

  const handleClickOutsideNav = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setExpandNav(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideNav);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNav);
    };
}, []);

  useEffect(() => {
    if (!showSearch) return;
    const closeMenu = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showSearch]);


  return (
    <div>
    {showSearch && (<SearchBarAndFilter showSearch={showSearch} searchRef={searchRef} />)}
    {!expandNav ? (
        <div className="nav-container-before">
          <ul className="nav-before-focus">
          <div className='nav-top-before'>
            <li onClick={handleNavExpansion}><Icon icon="charm:menu-hamburger" width={45}/></li>
          </div>
        </ul>
      </div>
      ) : (
        <div className="nav-open-background">
          <div className="nav-container-after" ref={navRef}>
            <ul className="nav-after-focus">
                <div className='nav-top-after'>
                  <li onClick={handleNavExpansion}><Icon icon="ion:caret-back" width={45}/></li>
                  <li><h2>{user.username}</h2></li>
                  <NavLink to={'/'} onClick={handleNavExpansion}>
                    <img src={user.profile_image} alt="profile-img" width={125}/>
                  </NavLink>
              </div>
              <div className="nav-center-after">
                <li className='nav-item' style={{margin:'0px'}} onClick={handleSearch}><Icon icon="fluent:search-20-regular" width={35}/>SEARCH</li>
                  <NavLink to={'/users/current/products'} className='nav-item' onClick={handleNavExpansion}>
                    <Icon icon="fluent:square-20-regular" width={35}/>PRODUCTS
                  </NavLink>
                <NavLink to={'/users/current/collections'} className='nav-item' onClick={handleNavExpansion}>
                  <Icon icon="fluent:squares-nested-20-regular" width={35}/>COLLECTIONS
                </NavLink>
                <NavLink to={'/users/current/favorites'} className='nav-item' onClick={handleNavExpansion}>
                  <Icon icon="fluent:heart-20-regular" width={35}/>FAVORITES
                </NavLink>
              </div>
              <div className="nav-bottom-after">
                <button className="logout-button" onClick={logout}>LOG OUT</button>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation;