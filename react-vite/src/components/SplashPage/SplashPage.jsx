import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion as m } from 'framer-motion';
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import LoginFormModal from "../Modals/LoginFormModal";
import 'iconify-icon';
import "./SplashPage.css";


function SplashPage() {
    const user = useSelector(state => state.session.user);
    const [loginModalVisible, setLoginModalVisible] = useState(false)
    const navigate = useNavigate();

    console.log('is login visible?', loginModalVisible)
    return (
        <div className="splashpage-container">
            <m.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 2.5}}
                className="splashpage-heading-div">
                <h1 style={{fontSize: '160px'}}>SKIN-NOT-RX</h1>
            </m.div>
            <m.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 2.5}}
                className="splashpage-subtext-container"> 
                <h1 className="splashpage-header">Your personal skincare tracker</h1>
                <p className="splashpage-subtext">Keeping track of what products you have, products you've loved,
                and products that you wouldn't bother purchasing again shouldn't be hard...
                and those are the conveniences that Skin-not-Rx aims to provide.
                </p>
                <OpenModalButton
                    className="login-modal-button"
                    buttonText="Log in"
                    modalComponent={<LoginFormModal/>}
                />
            </m.div>
            {/* <m.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                onClick={() => navigate('/auth/login')}>
                <iconify-icon 
                    icon="ri:arrow-drop-down-line" 
                    className="splashpage-dropdown-icon"
                    style={{fontSize: '60px', color: 'white', position:'absolute', zindex:'2', cursor:'pointer'}}>
                </iconify-icon>
            </m.div> */}
            {loginModalVisible && (
                <m.div>
                    <LoginFormModal isVisible={loginModalVisible} setIsVisible={setLoginModalVisible}/>     
                </m.div>
            )}
        </div>
    )
};



export default SplashPage;
