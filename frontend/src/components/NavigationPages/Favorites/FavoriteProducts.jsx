import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavoriteProducts } from "../../../redux/favoriteProduct";
import OpenModalButton from "../../../utils/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import { Icon } from "@iconify/react";
import "./Favorites.css";

function FavoriteProducts() {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.favoriteProducts.allFavoritedProducts);

    useEffect(() => {
        dispatch(getFavoriteProducts());
    }, [dispatch]);


    return (
        <div className="fave-prod-page-container">
            <h2 className="fave-prod-heading">Favorite Products</h2>
            <div className="favorite-search-div">
                <Icon icon="fluent:search-20-filled" width={25} height={25}/><input type="text" className="favorite-search"/>
            </div>
            {favoriteProducts ? (
                <div className="fave-prod-tiles-div">
                    {favoriteProducts.map((faveProd) => (
                        <OpenModalButton
                            key={`${faveProd.id}-faveProd-${faveProd.product_id}`}
                            className="fave-prod-tile-btn"
                            buttonText={
                                <>
                                    <img 
                                        src={faveProd.product_details.preview_image} 
                                        className="fave-prod-tile-img" 
                                    />
                                    <div className="fave-prod-star-div">
                                        <Icon 
                                            icon='fluent:star-20-filled' 
                                            width={25} 
                                            height={25} 
                                            color="#FEDC56" 
                                            className="star-icon"/>
                                    </div>
                                    <div>
                                        <ul className="fave-prod-tile-info-ul">
                                            <li style={{ fontWeight: "600" }}>{faveProd.product_details.brand_name}</li>
                                            <li>{faveProd.product_details.product_name}</li>
                                        </ul>
                                    </div>
                                </>
                            }
                            modalComponent={<ProductInfoModal productId={faveProd.product_id} />}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <h2>Nothing to display here</h2>
                </div>
            )}
        </div>
    );
}

export default FavoriteProducts;
