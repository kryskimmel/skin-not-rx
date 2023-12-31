import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../redux/product";
import { Icon } from '@iconify/react';
import "./ExploreProducts.css"
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductInfoModal";


function ExploreProducts() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);
    const [onHoverStar, setOnHoverStar] = useState(null);
    // const [productId, setProductId] = useState(null);

    useEffect(() => {
        dispatch(productActions.getAllProducts());
    }, [dispatch]);


    const handleOnHoverStar = (productId) => {
        setOnHoverStar(productId);
    }

    const handleOffHoverStar = () => {
        setOnHoverStar(null);
    }

    return (
        <>
        <div className="explore-products-container">
            {allProducts && allProducts.map(product =>
                <div className="product-tile" key={product.id} onClick={() => {setProductId(product.id)}}>
                    <div className="product-tile-buttons" key={`${product.id}-favorite`}>
                        <ul>
                            <li
                                className="products-star-icon"
                                onMouseOver={()=> handleOnHoverStar(product.id)}
                                onMouseOut={handleOffHoverStar}>
                                {onHoverStar !== product.id ? <Icon icon="clarity:favorite-line" width="25" height="25"/> : <Icon className="favorite-star-icon" icon="clarity:favorite-solid" color="#f4c430" width="30" height="30" />}
                            </li>
                        </ul>
                    </div>
                    <div className="product-info-modal-button">
                        <OpenModalButton
                            modalComponent={<ProductInfoModal productId={product.id}/>}
                        />
                    </div>
                    <img src={product.preview_image} alt={product.product_name} width={"175px"} height={"175px"} style={{objectFit:"cover", borderRadius:"15px"}}/>
                    <div className="product-info">
                            <ul>
                                <li style={{fontWeight:"600"}}>{product.brand_name}</li>
                                <li>{product.product_name}</li>
                            </ul>
                    </div>
                </div>
            )}
        </div>

        </>
    )
}

export default ExploreProducts;
