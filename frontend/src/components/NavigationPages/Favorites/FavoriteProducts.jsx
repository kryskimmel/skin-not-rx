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

    console.log('fave products of user??', favoriteProducts);

    return (
        <div className="favorite-products-container">
            <h2 className="favorite-products-heading">Favorite Products</h2>
            {favoriteProducts ? (
                <div className="favorite-products-tiles">
                    {favoriteProducts.map((faveProd) => (
                        <OpenModalButton
                            className="product-tile-button"
                            key={`${faveProd.id}-faveProd-${faveProd.product_id}`}
                            buttonText={
                                <div className="product-tile">
                                    <img src={faveProd.product_details.preview_image} className="product-tile-img" />
                                    <div>
                                        <ul className="product-tile-info-ul">
                                            <li style={{ fontWeight: "600" }}>{faveProd.product_details.brand_name}</li>
                                            <li>{faveProd.product_details.product_name}</li>
                                        </ul>
                                    </div>
                                    <div className="favorite-star-div">
                                        <Icon icon='fluent:star-20-filled' width={25} height={25} color="#FEDC56" className="favorite-star"/>
                                    </div>
                                </div>
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
