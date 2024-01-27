import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateProductModal from "../Modals/CreateProductModal/CreateProductModal";
import CreateCollectionModal from "../Modals/CreateCollectionModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import "./Navigation.css";
import SearchBarAndFilter from "../SearchBar/SearchBarAndFilter";


function Navigation() {
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const createRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);




  return (
    <div className="nav-container">
      <ul className="nav-left">
        <li>
          <NavLink to="/" className="logo"><img src="https://skin-not-rx-bucket.s3.us-east-2.amazonaws.com/static/skin-not-rx-logo.png" /></NavLink>
        </li>
      </ul>
      <ul className="nav-center">
        {user ?
          <>
            <li><NavLink to="/" className="home">HOME</NavLink></li>
            <li onClick={() => setShowSearch(!showSearch)} className="search">SEARCH</li>
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
      <SearchBarAndFilter showSearch={showSearch} />
    </div>
  );
}

export default Navigation;



{/* <li className="create" onClick={toggleMenu}>CREATE</li>
{showMenu && (
<div className="create-options-container" ref={createRef}>
    <OpenModalButton
      buttonText="Product"
      onButtonClick={closeMenu}
      modalComponent={<CreateProductModal/>}
    />
    <OpenModalButton
      buttonText="Collection"
      onButtonClick={closeMenu}
      modalComponent={<CreateCollectionModal/>}
    />
</div>
)} */}
