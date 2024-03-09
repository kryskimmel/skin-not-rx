import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCurrUserProducts } from "../../../redux/product";
import { addProductToFavorites } from "../../../redux/favoriteProduct";
import OpenModalButton from "../../../utils/OpenModalButton";
import SearchProductsModal from "../../Modals/ProductModals/SearchProductsModal";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import CreateProductModal from "../../Modals/ProductModals/CreateProductModal";
import Collapsible from "../../../utils/Collapsible";
import { Icon } from "@iconify/react";
import "./UserProducts.css";

function UserProducts() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.allProducts);
    const userProductsByType = useSelector(state => state.products.byProductType);
    const [isFavorite, setIsFavorite] = useState(() => {
        const storedFavorites = localStorage.getItem('favoriteProducts');
        return storedFavorites ? JSON.parse(storedFavorites) : {};
    });
 
    useEffect(() => {
        dispatch(getCurrUserProducts())
    }, [dispatch]);

    const handleFavoriteClick = (prodId) => {
        setIsFavorite((prev) => {
            const updatedFavorites = {
                ...prev,
                [prodId]: true
            };
            localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));

            if (!prev[prodId]) {
                dispatch(addProductToFavorites({ product_id: prodId }));
            }
            return updatedFavorites;
        });
    };


    return (
        <div className="prod-page-container">
            <div className="prod-header-div">
                <h1 className="prod-heading">PRODUCTS</h1>
                <p className="prod-count-text">{userProducts.length} items</p>
                <div className="prod-heading-btns-div">
                    <OpenModalButton
                        buttonText={
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <p>Create A Product</p>
                            </div>}
                        className="prod-create-btn"
                        modalComponent={<CreateProductModal />}
                    />
                    <OpenModalButton
                        buttonText={<Icon icon="fluent:search-20-filled" width={20} height={20}/>}
                        className="prod-search-btn"
                        modalComponent={<SearchProductsModal />}
                    />
                </div>
            </div>
            <div className="prod-page-contents-div">
                <div className="prod-tiles-div">
                    {userProducts.length ? userProducts.map((attr) => (
                        <div key={`prodtile-${attr.id}-${attr.product_name}`} style={{position:'relative'}}>
                            <OpenModalButton
                                className="prod-tile-btn"
                                buttonText={
                                    <>
                                        <img 
                                            src={attr.preview_image} 
                                            className="prod-tile-img"
                                        />
                                        <div className="prod-star-div" onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleFavoriteClick(attr.id); 
                                        }}>
                                            {isFavorite[attr.id] ? 
                                            <p className="fave-prod-text">favorite</p> : 
                                            <Icon 
                                                icon='fluent:star-20-regular' 
                                                width={25} 
                                                height={25} 
                                                className="star-icon"
                                            />  
                                            }
                                        </div>
                                        <div>
                                            <ul className="prod-tile-info-ul">
                                                <li style={{ fontWeight: "600" }}>{attr.brand_name}</li>
                                                <li>{attr.product_name}</li>
                                            </ul>
                                        </div>
                                    </>
                                }
                                modalComponent={<ProductInfoModal productId={attr.id} />}
                            />
                        </div>
                        ))
                        :(
                        <div className="no-products-div">
                            <p className="no-products-text">You have not added any products!</p>
                        </div>
                    )}
                </div>
                <div className="prod-by-type-div">
                    {userProductsByType && Object.entries(userProductsByType).map(([productType, products]) => (
                        <Collapsible 
                            key={`${productType}-${products[0]}`} 
                            label={productType} 
                            className='prod-collapsible'>
                            <div className="prod-collapsible-content">
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <div key={`${product}-${index}`}>
                                            <OpenModalButton
                                                className="prod-by-type-btn"
                                                buttonText={
                                                    <>
                                                        <img 
                                                            className="prod-by-type-img"
                                                            src={product.preview_image} 
                                                            alt={product.product_name}
                                                            title={`${product.brand_name}-${product.product_name}`}
                                                        />
                                                    </>
                                                }
                                                modalComponent={<ProductInfoModal productId={product.id} />}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <p>You have not added any {productType.toLowerCase()}!</p>
                                    </div>
                                )}
                            </div>
                        </Collapsible>
                    ))}
                </div>
            </div>        
        </div>
    )
}

export default UserProducts;