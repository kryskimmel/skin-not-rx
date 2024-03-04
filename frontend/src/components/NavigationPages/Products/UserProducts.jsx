import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as ProductActions from "../../../redux/product";
import OpenModalButton from "../../../utils/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import CreateProductModal from "../../Modals/ProductModals/CreateProductModal";
import Collapsible from "../../../utils/Collapsible";
import "./UserProducts.css";

function UserProducts() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.product.allProducts);
    const userProductsByType = useSelector(state => state.product.byProductType);
    const [favoritedProducts, setFavoritedProducts] = useState({});

    const handleFavoriteChange = (updatedFavorites) => {
        setFavoritedProducts(updatedFavorites);
        localStorage.setItem('favoritedProducts', JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoritedProducts');
        if (savedFavorites) {
            setFavoritedProducts(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        dispatch(ProductActions.viewCurrUserProducts())
    }, [dispatch]);

    return (
        <div className="products-container">
            <div className="products-header">
                <h1 className="products-title">PRODUCTS<span className="products-title-span">{userProducts.length}</span></h1>
                <OpenModalButton
                    buttonText={
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p>Create A Product</p>
                        </div>}
                    className="products-create-button"
                    modalComponent={<CreateProductModal />}
                />
            </div>
            <div className="products-inner-container">
                <div className="products-wrapper">
                    {userProducts
                        ? userProducts.map((attr) => (
                            <div key={attr.id} style={{position:'relative'}}>
                                <OpenModalButton
                                    className="product-tile-button"
                                    buttonText={
                                        <div className="product-tile">
                                            {favoritedProducts[attr.id] ? <p className="favorited-text">Favorited</p> : null}
                                            <img src={attr.preview_image} className="product-tile-img"/>
                                            <div>
                                                <ul className="product-tile-info-ul">
                                                    <li style={{ fontWeight: "600" }}>{attr.brand_name}</li>
                                                    <li>{attr.product_name}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                    modalComponent={<ProductInfoModal productId={attr.id} onFavoriteChange={handleFavoriteChange} />}
                                />
                            </div>
                        ))
                        : <h2 className="no-products-text">You have not created any products!</h2>}
                </div>
                <div className="products-by-type-wrapper">
                    {userProductsByType && Object.entries(userProductsByType).map(([productType, products]) => (
                        <Collapsible key={`${productType}-${products[0]}`} label={productType} className='products-collapsible'>
                            <div className="product-collapsible-content">
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <div key={`${product}-${index}`}>
                                            <OpenModalButton
                                                className="products-by-type-button"
                                                buttonText={
                                                    <div className="products-by-type-tile" title={`${product.brand_name} ${product.product_name}`}>
                                                        <img 
                                                            src={product.preview_image} 
                                                            alt={product.product_name}
                                                            className="products-by-type-img"
                                                        />
                                                    </div>
                                                }
                                                modalComponent={<ProductInfoModal productId={product.id} onFavoriteChange={handleFavoriteChange} />}
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