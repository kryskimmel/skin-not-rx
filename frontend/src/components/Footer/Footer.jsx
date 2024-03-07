import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Footer.css";

function Footer () {
    const navigate = useNavigate();

    return (
        <div className="footer-container">
            <div className="footer-left">
                <div className="footer-skinnotrx">
                    <p className="skinnotrx-text" onClick={() => navigate("/")}>SKIN-NOT-R̶X̶</p>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-github-link">
                    <a href="https://github.com/kryskimmel/skin-not-rx" target="_blank" rel="noreferrer">
                        <Icon icon="fa:github" color="#000000" width={30} height={30}/>
                    </a>
                </div>
                <div className="footer-personal-github-link">
                    <a href="https://github.com/kryskimmel" target="_blank" rel="noreferrer" className="personal-github-link">
                        <p>Krystal&apos;s Github</p>
                    </a>
                </div>
            </div>  
        </div>
    )
}

export default Footer;