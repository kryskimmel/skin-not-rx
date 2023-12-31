import { useSelector } from "react-redux";
import ProductRandomizer from "../Products/ProductRandomizer";
import "./SplashPage.css";


function SplashPage() {
    const user = useSelector(state => state.session.user);

    return (
        <div className="splashpage-container">
            <div className="splashpage-left">
                <div className="splashpage-header-container">
                    <h1 className="splashpage-header">Your personal skincare tracker</h1>
                    <p className="splashpage-subtext">Keeping track of what products you have, products you've loved,
                        and products that you wouldn't bother purchasing again shouldn't be hard...
                        and those are the conveniences that Skin-not-Rx aims to provide.</p>
                </div>
                <ProductRandomizer/>
            </div>
            {user && (
                <div className="splashpage-user-greeting-container">
                    <h2 className="splashpage-greeting">Hello {user.username}!</h2>
                    <img src={user.profile_image} alt={`${user.profile_image} profile image`} className="splashpage-profile-image"/>
                </div>
            )}
        </div>


    )
}

export default SplashPage;
