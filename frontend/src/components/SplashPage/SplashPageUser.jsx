import { useSelector } from "react-redux";
import "./SplashPageUser.css";

function SplashPageUser() {
    const user = useSelector(state => state.session.user);

    return (
        <div className="splashpage-user-container">
            <div className="splashpage-user-profile-div">
                <img 
                    src={user.profile_image} 
                    alt="profile image" 
                    className="sp-profile-img"
                />
                <h3 className="sp-user-info">Username: <span className="sp-user-span">{user.username}</span></h3>
                <h3 className="sp-user-info">Skin type: <span className="sp-user-span">{user.skin_type.toLowerCase()}</span></h3>
                <h3 className="sp-user-info">Products tracked: <span className="sp-user-span">###</span></h3>
                <h3 className="sp-user-info">Collections made: <span className="sp-user-span">###</span></h3>
            </div>
        </div>
    )
}

export default SplashPageUser;