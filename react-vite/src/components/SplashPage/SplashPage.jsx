
import { useSelector } from "react-redux";
import splashPageImagesData from "./splashPageImagesData";
import "./SplashPage.css";

function SplashPage() {
    const user = useSelector(state => state.session.user);
    const leftImg = splashPageImagesData[0]
    const grid2x2Imgs = splashPageImagesData.slice(1,5)
    const bottomFourImgs = splashPageImagesData.slice(5,9)
    console.log(grid2x2Imgs)
    console.log(bottomFourImgs)
    return (
        <div className="splashpage-container">
            <div className="splashpage-heading-div">
                <h1>SKIN-NOT-RX</h1>
            </div>
            <div className="grid-imgs-div">
            {grid2x2Imgs.map((image, idx) => (
                <img src={image.url} key={`splashpage-grid-imgs-${idx}`}/>
            ))}
            </div>
            <div className="bottom-imgs-div">
            {bottomFourImgs.map((image, idx) => (
                <img src={image.url} key={`splashpage-bottom-imgs-${idx}`}/>
            ))}
            </div>
        </div>
    )
    // return (
    //     <div className="splashpage-container">
    //         <div className="splashpage-content">
    //             <div className="splashpage-heading">
    //                 <h1 style={{ fontSize: '70px', }}>SKIN-NOT-RX</h1>
    //             </div>
    //             {user && (
    //                 <div className="splashpage-user-greeting-container">
    //                     <h2 className="splashpage-greeting">Hello {user.username}!</h2>
    //                     <img src={user.profile_image} alt={`${user.profile_image} profile image`} className="splashpage-profile-image" />
    //                 </div>
    //             )}
    //             <div className="splashpage-header-container">
    //                 <h1 className="splashpage-header">Your personal skincare tracker</h1>
    //                 <p className="splashpage-subtext">Keeping track of what products you have, products you've loved,
    //                     and products that you wouldn't bother purchasing again shouldn't be hard...
    //                     and those are the conveniences that Skin-not-Rx aims to provide.</p>
    //             </div>

    //         </div>
    //     </div>


    // )
}

export default SplashPage;
