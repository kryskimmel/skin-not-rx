import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavoriteProducts, removeProductFromFavorites } from "../../../redux/favoriteProduct";
import OpenModalButton from "../../../utils/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import { Icon } from "@iconify/react";
import "./Favorites.css";

function FavoriteProducts() {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.favoriteProducts.allFavoritedProducts);
    console.log('favorite products---', favoriteProducts)
    console.log(useSelector(state => state.favoriteProducts))

    useEffect(() => {
        dispatch(getFavoriteProducts());
    }, [dispatch]);

    const handleRemoveFavorite = async (favoriteId) => {
        await dispatch(removeProductFromFavorites(favoriteId));
    };

    const removeFavoriteLocalStorage = (productId) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts'));
        delete favorites[productId];
        localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
    }


    return (
        <div className="fave-prod-page-container">
            <h2 className="fave-prod-heading">Favorite Products</h2>
            <div className="favorite-search-div">
                <Icon icon="fluent:search-20-filled" width={25} height={25}/><input type="text" className="favorite-search"/>
            </div>
            {favoriteProducts.length ? (
                <div className="fave-prod-tiles-div">
                    {favoriteProducts.map((faveProd) => (
                        <OpenModalButton
                            key={`${faveProd.id}-faveProd-${faveProd.product_id}`}
                            className="fave-prod-tile-btn"
                            buttonText={
                                <>
                                    <img 
                                        src={faveProd.product_details?.preview_image} 
                                        className="fave-prod-tile-img" 
                                    />
                                    <div className="fave-prod-star-div" onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(faveProd.id); removeFavoriteLocalStorage(faveProd.product_id) }}>
                                        <Icon 
                                            icon='fluent:star-20-filled' 
                                            width={25} 
                                            height={25} 
                                            color="#9cb781" 
                                            className="star-icon"/>
                                    </div>
                                    <div>
                                        <ul className="fave-prod-tile-info-ul">
                                            <li style={{ fontWeight: "600" }}>{faveProd.product_details?.brand_name}</li>
                                            <li>{faveProd.product_details?.product_name}</li>
                                        </ul>
                                    </div>
                                </>
                            }
                            modalComponent={<ProductInfoModal productId={faveProd.product_id} />}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-fave-prod-div">
                    <h3 className="no-fave-prod-text">You have not favorited any products yet!</h3>
                </div>
            )}
        </div>
    );
}

export default FavoriteProducts;
