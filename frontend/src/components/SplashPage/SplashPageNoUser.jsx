/* eslint-disable react/no-unescaped-entities */
import { motion as m } from 'framer-motion';
import OpenModalButton from "../../utils/OpenModalButton";
import LoginFormModal from "../Modals/AuthModals/LoginFormModal";
import 'iconify-icon';
import "./SplashPageNoUser.css";


function SplashPageNoUser() {
    return (
        <div className="splashpage-container">
            <m.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 1.0, ease: 'easeIn'}}
                className="splashpage-heading-div">
                <h1 className="splashpage-nouser-heading">SKIN-NOT-RX</h1>
            </m.div>
            <m.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 1.0, ease: 'easeIn'}}
                className="splashpage-subtext-container"> 
                <h1 className="splashpage-header">Your personal skincare tracker</h1>
                <p className="splashpage-subtext">Keeping track of what products you have, products you've loved,
                and products that you wouldn't bother purchasing again shouldn't be hard...
                and those are the conveniences that Skin-not-Rx aims to provide.
                </p>
                <OpenModalButton
                    className="login-modal-button"
                    buttonText="ENTER"
                    modalComponent={<LoginFormModal/>}
                />
            </m.div>
        </div>
    )
}

export default SplashPageNoUser;