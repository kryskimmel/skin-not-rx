import { useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CreateProductModal from "../Modals/CreateProductModal/CreateProductModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import "./Navigation.css";


function Navigation() {
  const user = useSelector(state => state.session.user);

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
              <li><NavLink to="/explore" className="explore">EXPLORE</NavLink></li>
              <li className="create">
                <OpenModalButton
                buttonText="CREATE"
                modalComponent={<CreateProductModal/>}
                />
              </li>
              <li><NavLink to='/users/current/profile' className="profile">PROFILE</NavLink></li>
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
