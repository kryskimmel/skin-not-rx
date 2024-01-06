import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as productActions from "../../../redux/product";
import { Icon } from '@iconify/react';
import "./SearchBarAndAddProduct.css";

function SearchBarAndAddProduct ({ productsToAdd }) {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts)
    const [searchInput, setSearchInput] = useState('')
    const [addedProducts, setAddedProducts] = useState([])


    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts())
        productsToAdd(addedProducts)
    }, [dispatch, addedProducts])

    const productList = [];
    for (let product in allProducts){
        productList.push({'productId':allProducts[product].id, 'brandName':allProducts[product].brand_name, 'productName':allProducts[product].product_name, 'previewImg':allProducts[product].preview_image},
    )}

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    };

    const handleSearch = (searchTerm) => {
        setSearchInput(searchTerm)
    };

    // resets the input in search bar
    const resetSearch = () => {
        setSearchInput("")
    };


    // adds product to developing collection
    const addProduct = (searchTerm) => {
        productList.forEach((product) => {
            if (product["productName"].match(searchTerm)) {
                const productExists = addedProducts.some((addedProduct) => addedProduct.productId === product.productId);

                if (!productExists) {

                    setAddedProducts((prev) => [...prev, {
                        'productId':product.productId,
                        'brandName':product.brandName,
                        'productName': product.productName,
                        'previewImg':product.previewImg
                    }])
                } else {
                    return;
                }
            }
        })
    };





    // removes product to developing collection
    const removeProduct = (productId) => {
        const updatedProducts = addedProducts.filter((product) => product.productId !== productId);
        setAddedProducts(updatedProducts);
    };

    // // sends an array of products to CreateCollectionModal component
    // const handleProductsToAdd = () => {
    //     const productIds = [];
    //     addedProducts.map((product) => {productIds.push(product.productId)})
    //     productsToAdd(productIds)
    // };



    return (
        <div className="searchbar-container">
            <label htmlFor="search">Find a product <Icon icon="ph:magnifying-glass" width="20" height="15" /></label>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Type in a product name..."
                    onChange={handleInputChange}
                    value={searchInput}
                />
                <button type="button" onClick={resetSearch}><Icon icon="octicon:x-12" width="15" height="15"/></button>
            </div>

            <div className="dropdown">
                {productList.filter(product => {
                    const searchTerm = searchInput.toLowerCase();
                    const productName = product.productName.toLowerCase();
                    const brandName = product.brandName.toLowerCase();
                    return (searchTerm && productName.startsWith(searchTerm) && productName !== searchTerm) || (searchTerm && brandName.startsWith(searchTerm) && brandName !== searchTerm)
                })
                .map((product) => (
                    <div className="dropdown-row" key={product.productId} onClick={() => {handleSearch(product.productName); addProduct(product.productName); resetSearch()}}>{product.brandName} - {product.productName}</div>
                ))}
            </div>

            <div className="search-comp-product-tiles-div">
                {addedProducts?.map((productTile) => (
                    <div className="search-comp-product-tile" key={productTile.productId}>
                        <Icon className="search-comp-close-icon" icon="octicon:x-12" color="#000000" width="15" height="15" onClick={() => {removeProduct(productTile.productId)}}/>
                        <img src={productTile.previewImg} alt={productTile.productName} title={productTile.productName} className="search-comp-product-tile-img" />
                        <p style={{fontWeight:"600"}}>{productTile.brandName}</p>
                        <p>{productTile.productName}</p>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default SearchBarAndAddProduct;
