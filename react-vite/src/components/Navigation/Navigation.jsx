import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateProductModal from "../Modals/CreateProductModal/CreateProductModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import "./Navigation.css";


function Navigation() {
  const user = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
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

  console.log(showMenu, 'show menu?')

  return (
    <div className="nav-container">
      <ul className="nav-left">
        <li>
          <NavLink to="/" className="logo" style={{ textDecoration: 'none', color: '#000000' ,fontSize:'20px' }}>SKIN-<span style={{textDecoration:"line-through"}}>rx</span></NavLink>
        </li>
      </ul>
      <ul className="nav-center">
        {user ?
            <>
              <li><NavLink to="/" className="home">HOME</NavLink></li>
              <li><NavLink to='/users/current/products' className="products">PRODUCTS</NavLink></li>
              <li><NavLink to='' className="collections">COLLECTIONS</NavLink></li>
              <li className="create" onClick={toggleMenu}>CREATE</li>
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
                  />
              </div>
              )}
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
