import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrUserProducts } from "../../redux/product";
import { getCurrUserCollections } from "../../redux/collection";
import LoadingSpinner from "../../utils/LoadingSpinner";
import "./SplashPageUser.css";

function SplashPageUser() {
    const dispatch =useDispatch();
    const user = useSelector(state => state.session.user);
    const totalProducts = useSelector(state => state.products.allProducts);
    const totalCollections = useSelector(state => state.collections.allCollections);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(getCurrUserProducts());
        dispatch(getCurrUserCollections()).then(() => setIsLoading(false));
    }, [dispatch])

    if (isLoading) {
        return <LoadingSpinner/>
    } else {
        return (
            <div className="splashpage-user-container">
                <div className="splashpage-user-profile-div">
                    <img 
                        src={user.profile_image} 
                        alt="profile image" 
                        className="sp-profile-img"
                    />
                    <h3 className="sp-user-info">Username: <span className="sp-user-span">{user.username}</span></h3>
                    <h3 className="sp-user-info">Skin type: <span className="sp-user-span">{user.skin_type}</span></h3>
                    <h3 className="sp-user-info">Products tracked: <span className="sp-user-span">{totalProducts.length ? totalProducts.length : 0}</span></h3>
                    <h3 className="sp-user-info">Collections created: <span className="sp-user-span">{totalCollections.length ? totalCollections.length : 0}</span></h3>
                </div>
            </div>
        )
    }
}

export default SplashPageUser;