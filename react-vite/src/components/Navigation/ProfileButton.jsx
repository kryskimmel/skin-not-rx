import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import { Icon } from '@iconify/react';


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      {!user ? <li className="login-button-icon"><Icon icon="material-symbols:login" width="40" height="40" onClick={toggleMenu}/></li> : <li className="user-profile-icon-button"><Icon icon="iconoir:profile-circle" width="40" height="40" onClick={toggleMenu}/></li>}
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.username}!</li>
              <li><NavLink to="/current/profile" style={{ textDecoration: 'none', color: '#000000' }}>My Profile</NavLink></li>
              <li>My Favorites</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
