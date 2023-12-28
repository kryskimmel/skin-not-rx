import ProductRandomizer from "../Products/ProductRandomizer";
import "./SplashPage.css";


function SplashPage() {
    return (
        <div className="splashpage-container">
            <h1>Skin-not-Rx</h1>
            <p>Your personal skincare tracker</p>
            <ProductRandomizer/>
        </div>


    )
}

export default SplashPage;
