/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrUserProducts } from "../../../../redux/product";
import { Icon } from '@iconify/react';
import "./SearchBarAndAddProduct.css";

function SearchBarAndAddProduct ({prevStoredProducts, setPrevStoredProducts, setAddProducts}) {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.products.allProducts);
    const [searchInput, setSearchInput] = useState('');
    const [productsToAdd, setProductsToAdd] = useState([]);
    const [listAllProducts, setListAllProducts] = useState(false);

    useEffect(() => {
        dispatch(getCurrUserProducts())
        setAddProducts(productsToAdd)
    }, [dispatch, productsToAdd, searchInput]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setListAllProducts(false);
        setSearchInput(e.target.value);
    };

    const resetSearch = () => {
        setSearchInput("")
    };

    const addProduct = (searchTerm) => {
        const prodToAdd = allProducts.find((product) => product["product_name"].match(searchTerm));
        if (prodToAdd) {
            const productExists = productsToAdd?.some((addedProduct) => addedProduct.id === prodToAdd.id);
            const productAlreadyStored = prevStoredProducts?.some((storedProduct) => storedProduct.id === prodToAdd.id);
    
            if (!productExists && !productAlreadyStored) {
                setProductsToAdd((prev) => [...prev, prodToAdd]);
            }
        }
    };

    const removeProduct = (prodId) => {
        const updatedProductsToAdd = productsToAdd.filter((prod) => prod.id !== prodId);
        setProductsToAdd(updatedProductsToAdd);
    
        const isPreviouslyStored = prevStoredProducts?.some((prod) => prod.id === prodId);
        if (isPreviouslyStored) {
            const updatedPrevStoredProducts = prevStoredProducts.filter((prod) => prod.id !== prodId);
            setPrevStoredProducts(updatedPrevStoredProducts);
        }
    };

    const handleProductItemClick = (product) => {
        setListAllProducts(false);
        addProduct(product.product_name);
        if (!prevStoredProducts?.includes(product.id)) {
            setAddProducts((prev) => [...prev, product]);
        }
        resetSearch();
    };


    return (
        <div className="searchbar-container">
            <label htmlFor="search"><Icon icon="ph:magnifying-glass" width="20" height="15" />Find a product to add to this collection:</label>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Type in a product name..."
                    onChange={handleInputChange}
                    value={searchInput}
                    style={{height:'30px', fontSize:'16px'}}
                />
                <button 
                    className="full-prod-list-button" 
                    title="Full product list"
                    type="button"
                    onClick={() => setListAllProducts(!listAllProducts)}>
                    <Icon icon="fluent:list-16-regular" width={20} height={20}/>
                </button>
                {listAllProducts && (
                    <div>
                        <ul className="full-prod-list-ul">
                            <p style={{marginBottom:'10px',color: '#4d4b4b'}}>{allProducts.length} products</p>
                            {allProducts.map((product) => (
                                <li 
                                    key={`product-item-search-${product.product_name}-${product.id}`}
                                    className="full-prod-list-li"
                                    onClick={() => handleProductItemClick(product)}
                                    >
                                    {product.brand_name}: {product.product_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="dropdown">
            {!allProducts ? alert("Please create a product before creating a collection.") : (allProducts?.filter(product => {
                const searchTerm = searchInput.toLowerCase();
                const prodName = product.product_name.toLowerCase();
                const brandName = product.brand_name.toLowerCase();
                return (
                    (searchTerm && prodName.startsWith(searchTerm) && prodName !== searchTerm) || 
                    (searchTerm && brandName.startsWith(searchTerm) && brandName !== searchTerm)
                ) 
            }).map((product) => (
                <div
                    className="dropdown-row"
                    key={`dropdown-${product.id}-${product.product_name}`}
                    onClick={() => handleProductItemClick(product)}>
                    {product.brand_name} - {product.product_name}
                </div>
            )))}
            </div>
            <div className="search-comp-product-tiles-div">
                {productsToAdd?.map((productTile) => (
                    <div className="search-comp-product-tile" key={`${productTile.id}-tile-${productTile.product_name}`}>
                        <img src={productTile.preview_image} alt={productTile.product_name} title={`${productTile.brand_name}: ${productTile.product_name}`} className="search-comp-product-tile-img" />
                        <div className="product-tile-name">
                            <p style={{fontWeight:'600'}}>{productTile.brand_name}</p>
                            <p>{productTile.product_name}</p>
                        </div>
                        <button className="remove-product-button" onClick={() => removeProduct(productTile.id)}>
                            Remove
                        </button>
                    </div>
                ))}
                {prevStoredProducts?.map((productTile) => (
                    <div className="search-comp-product-tile" key={`${productTile.id}-tile-${productTile.product_name}`}>
                        <img src={productTile.preview_image} alt={productTile.product_name} title={`${productTile.brand_name}: ${productTile.product_name}`} className="search-comp-product-tile-img" />
                        <div className="product-tile-name">
                            <p style={{fontWeight:'600'}}>{productTile.brand_name}</p>
                            <p>{productTile.product_name}</p>
                        </div>
                        <button className="remove-product-button" onClick={() => removeProduct(productTile.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchBarAndAddProduct;