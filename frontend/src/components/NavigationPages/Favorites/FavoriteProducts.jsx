import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFavoritedProducts } from "../../../redux/favorite";

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
                <div key={`${faveProd.id}-faveProd-${faveProd.product_id}`}>
                    <h2>{faveProd.product_details['product_name']}</h2>
                </div>)): 
                <div>
                    <h2>Nothing to display here</h2>
                </div>
            }
        </div>
    )
}

export default FavoriteProducts;