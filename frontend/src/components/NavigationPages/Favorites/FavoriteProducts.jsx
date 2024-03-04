import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFavoritedProducts } from "../../../redux/favorite";
import OpenModalButton from "../../../utils/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import "./Favorites.css";

function FavoriteProducts () {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.favorite.allFavoritedProducts);

    useEffect(() => {
        dispatch(getAllFavoritedProducts())
    }, [dispatch])

    console.log('fave products of user??', favoriteProducts)

    return (
        <div className="favorite-products-container">
            {favoriteProducts ? favoriteProducts.map((faveProd) => (
                 <OpenModalButton
                 className="product-tile-button"
                 key={`${faveProd.id}-faveProd-${faveProd.product_id}`}
                 buttonText={
                     <div className="product-tile">
                         <img src={faveProd.product_details.preview_image} className="product-tile-img"/>
                         <div>
                             <ul className="product-tile-info-ul">
                                 <li style={{ fontWeight: "600" }}>{faveProd.product_details.brand_name}</li>
                                 <li>{faveProd.product_details.product_name}</li>
                             </ul>
                         </div>
                     </div>
                 }
                 modalComponent={<ProductInfoModal productId={faveProd.product_id} />}
             />
             )): 
                <div>
                    <h2>Nothing to display here</h2>
                </div>
            }
        </div>
    )
}
// onFavoriteChange={handleFavoriteChange} 
export default FavoriteProducts;