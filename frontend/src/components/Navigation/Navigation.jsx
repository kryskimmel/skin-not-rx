import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBarAndFilter from "../NavigationPages/Search/SearchBarAndFIlter";


function Navigation() {
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const searchRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
    <div className="nav-container">
      <ul className="nav-left">
        <li>
          <NavLink to="/" className="logo"><img src="https://skin-not-rx-bucket.s3.us-east-2.amazonaws.com/splashpage/skin-not-rx-logo.png" /></NavLink>
        </li>
      </ul>
      <ul className="nav-center">
        {user ?
          <>
            <li onClick={toggleMenu} ref={searchRef} className="search">SEARCH</li>
            {showMenu && (<SearchBarAndFilter showMenu={showMenu} searchRef={searchRef} />)}
            <li><NavLink to='/users/current/products' className="products">PRODUCTS</NavLink></li>
            <li><NavLink to='/users/current/collections' className="collections">COLLECTIONS</NavLink></li>
          </>
          : null
        }
      </ul>
      <ul className="nav-right">
        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;