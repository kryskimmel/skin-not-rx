import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ExploreButton from "./ExploreButton";
import CreateProductModal from "../Modals/CreateProductModal/CreateProductModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import { Icon } from '@iconify/react';
import "./Navigation.css";


function Navigation() {
  const user = useSelector(state => state.session.user);

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
        {user ?
            <li className="add-product-button-icon">
              <OpenModalButton
              buttonText={<><Icon icon="material-symbols:add" width="25" height="25" /></>}
              modalComponent={<CreateProductModal/>}
              />
            </li>
            : null
        }
        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
