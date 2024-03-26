import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrUserProducts } from "../../../../redux/product";
import { addProductToFavorites, removeProductFromFavorites } from "../../../../redux/favoriteProduct";
import OpenModalButton from "../../../../utils/OpenModalButton";
import UpdateProductModal from "../UpdateProductModal";
import DeleteProductModal from "../DeleteProductModal";
import { Icon } from '@iconify/react';
import "./ProductInfoModal.css";


function ProductInfoModal({ productId }) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.byId[productId])
    const [isLoaded, setIsLoaded] = useState(false)
    const optionsRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
   
    useEffect(() => {
        dispatch(getCurrUserProducts()).then(() => { setIsLoaded(true) })
    }, [dispatch, productId])

    const handleStarClick = async (prodId) => {
        if (product.is_favorite === false) {
            dispatch(addProductToFavorites({product_id:prodId}))
            .then(() => dispatch(getCurrUserProducts()))
        } else {
            const favorite_id = product.favorite_id;
            await dispatch(removeProductFromFavorites(favorite_id))
            await dispatch(getCurrUserProducts())
        }
    }


    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
  
    
    return isLoaded && (
        <div className="product-info-modal-wrapper">
            <div className="product-info-image-div">
                <img src={product?.preview_image} alt={product?.product_name} className="product-info-image" width={175} height={175} style={{ objectFit: "fill", borderRadius: "15px" }} />
            </div>
            <div className="product-info-information-div">
                <ul className="product-info-information-ul">
                    <li><span style={{ fontWeight: "600" }}>BRAND NAME: </span> {product?.brand_name}</li>
                    <li><span style={{ fontWeight: "600" }}>NAME: </span> {product?.product_name}</li>
                    <li><span style={{ fontWeight: "600" }}>TYPE: </span> {product?.product_type}</li>
                    <li><span style={{ fontWeight: "600" }}>DESCRIPTION: </span> {product?.description}</li>
                    {product?.key_ingredients ? (
                        <li><span style={{ fontWeight: "600" }}>KEY INGREDIENTS: </span>
                            <ul className="product-info-key-ingredients-ul">
                                {product.key_ingredients?.split(",").map((ingredient, idx) => {
                                    if (idx < 3 && ingredient.trim() !== "") {
                                        return <li key={idx} className="your-css-class">{ingredient.trim()}</li>;
                                    }
                                    return null;
                                })}
                            </ul>
                        </li>) : null}
                    {product?.product_link ? (
                        <li style={{ display:'flex', alignItems:"center"}}>
                            <span style={{ fontWeight: "600" }}>PRODUCT LINK: </span>
                            <a href={product?.product_link} target="_blank" rel='noreferrer'>
                                <Icon icon="uil:link" width="20" height="20" />
                            </a>
                        </li>
                    ) : null}
                </ul>
            </div>
            <div className="product-info-tools-div">
                <button className="favorite" onClick={(e) => {e.stopPropagation(); handleStarClick(product.id)}}>
                    {product.is_favorite === false ? (
                    <Icon
                    icon='fluent:star-20-regular' 
                    width="35"
                    height="35" 
                    className="star-icon"
                    />
                    ) : (
                    <Icon
                    icon='fluent:star-20-filled' 
                    color="#9cb781"
                    width="35" 
                    height="35"
                    className="star-icon"
                    />
                    )}
                </button>
                <button onClick={toggleMenu}>
                    <Icon icon="ph:dots-three-outline-vertical" width="35" height="35" ref={optionsRef} />
                </button>
                {showMenu && (
                    <div className="product-details-dropdown-container" >
                        {productId && (
                            <>
                                <OpenModalButton
                                    buttonText="Edit"
                                    onButtonClick={() => closeMenu}
                                    modalComponent={<UpdateProductModal productId={productId} product={product} />}
                                />
                                <OpenModalButton
                                    buttonText="Delete"
                                    onButtonClick={() => closeMenu}
                                    modalComponent={<DeleteProductModal
                                        brandName={product.brand_name}
                                        productName={product.product_name}
                                        productId={product.id}
                                    />}
                                />
                            </>
                        )}
                    </div>
                )}
                <OpenModalButton
                    title={'Close'}
                    buttonText={<Icon icon="ph:x-square-bold" width="35" height="35" />}
                />
            </div>
        </div>
    )
}


export default ProductInfoModal;