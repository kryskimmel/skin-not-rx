import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../../redux/product";
import OpenModalButton from "../../../../utils/OpenModalButton";
import UpdateProductModal from "../UpdateProductModal";
import DeleteProductModal from "../DeleteProductModal";
import { Icon } from '@iconify/react';
import "./ProductInfoModal.css";


function ProductInfoModal({ productId, onFavoriteChange }) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.byId[productId])
    const [isLoaded, setIsLoaded] = useState(false)
    const optionsRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const [favoritedProducts, setFavoritedProducts] = useState({});
   

    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts()).then(() => { setIsLoaded(true) })
    }, [dispatch, productId])

    const toggleHeartClick = (prodId) => {
        setFavoritedProducts((prev) => {
            const updatedFavorites = { ...prev };
            if (prev[prodId]) {
                delete updatedFavorites[prodId];
            } else {
                updatedFavorites[prodId] = true; 
            }
            localStorage.setItem('favoritedProducts', JSON.stringify(updatedFavorites));
            onFavoriteChange(updatedFavorites);
            return updatedFavorites;
        });
    };
    
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoritedProducts');
        if (savedFavorites) {
            setFavoritedProducts(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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

    console.log(showMenu, 'show menu??')

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
                    <li><span style={{ fontWeight: "600" }}>KEY INGREDIENTS: </span> {product?.key_ingredients}</li>
                    <li><span style={{ fontWeight: "600" }}>PRODUCT LINK: </span><a href={product?.product_link} target="_blank" rel='noreferrer'><Icon icon="uil:link" width="20" height="20" /></a></li>
                </ul>
            </div>
            <div className="product-info-tools-div">
                <div className="product-favorite-icon" onClick={()=>toggleHeartClick(product.id)}>
                    {favoritedProducts[product.id] ? (<Icon icon={"fluent:heart-20-filled"}  color="#8B0000" width="30" height="30"/> ) 
                    : (<Icon icon={"fluent:heart-20-regular"}  width="30" height="30"/>)}
                </div>
                <button onClick={toggleMenu}>
                    <Icon icon="ph:dots-three-outline-vertical" width="30" height="30" ref={optionsRef} />
                </button>
                {showMenu && (
                    <div className="product-details-dropdown-container" >
                        {productId && (
                            <>
                                <OpenModalButton
                                    buttonText="Edit"
                                    onButtonClick={closeMenu}
                                    modalComponent={<UpdateProductModal productId={productId} product={product} />}
                                />
                                <OpenModalButton
                                    buttonText="Delete"
                                    onButtonClick={closeMenu}
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
                    buttonText={<Icon icon="ph:x-square-bold" width="30" height="30" />}
                />
            </div>
        </div>
    )
}


export default ProductInfoModal;
