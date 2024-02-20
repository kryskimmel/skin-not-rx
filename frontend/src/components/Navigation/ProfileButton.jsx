import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalButton from "../../utils/OpenModalMenuButton";
import LoginFormModal from "../Modals/AuthModals/LoginFormModal";
import SignupFormModal from "../Modals/AuthModals/SignupFormModal";
import { Icon } from '@iconify/react';


function ProfileButton() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
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
    navigateTo('/');
    closeMenu();
  };

  return (
    <>
      {!user ? <Icon icon="solar:login-bold-duotone" width="40" height="40" onClick={toggleMenu} style={{ cursor: "pointer" }} /> : <button className="logout-button" onClick={logout}>Log Out</button>}
      {showMenu && (
        <div className="account-tools-dropdown-container" ref={ulRef}>
          {user ? null : (
            <div className="account-tools">
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
