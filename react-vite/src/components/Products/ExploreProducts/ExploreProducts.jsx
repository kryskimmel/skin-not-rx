import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../redux/product";
import "./ExploreProducts.css"

function ExploreProducts() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);

    useEffect(() => {
        dispatch(productActions.getAllProducts(allProducts))
    }, [dispatch])

    console.log('products==', allProducts)
    return (
        <>
        <div className="explore-products-container">
            {allProducts && allProducts.map(product =>
                <div className="product-tile">
                    <img src={product.preview_image} alt={product.product_name} width={"200px"} height={"200px"} style={{objectFit:"cover", borderRadius:"15px"}}/>
                    {product.brand_name}
                    {product.product_name}
                </div>
            )}
        </div>

        </>
    )
}

export default ExploreProducts;
