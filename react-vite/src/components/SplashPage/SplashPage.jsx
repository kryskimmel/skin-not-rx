
import { useSelector } from "react-redux";
import "./SplashPage.css";
import 'iconify-icon';

function SplashPage() {
    const user = useSelector(state => state.session.user);
    return (
        <div className="splashpage-container">
            <div className="splashpage-heading-div">
                <h1 style={{fontSize: '160px'}}>SKIN-NOT-RX</h1>
            </div>
            <div className="splashpage-subtext-container"> 
            <h1 className="splashpage-header">Your personal skincare tracker</h1>
                <p className="splashpage-subtext">Keeping track of what products you have, products you've loved,
                and products that you wouldn't bother purchasing again shouldn't be hard...
                and those are the conveniences that Skin-not-Rx aims to provide.
                </p>
            </div>
            <div className="">
                <iconify-icon 
                    icon="ri:arrow-drop-down-line" 
                    className="splashpage-dropdown-icon"
                    style={{fontSize: '60px', color: 'white', position:'absolute', zindex:'2', cursor:'pointer'}}>
                </iconify-icon>
            </div>
      
        </div>
    )
};

export default SplashPage;
