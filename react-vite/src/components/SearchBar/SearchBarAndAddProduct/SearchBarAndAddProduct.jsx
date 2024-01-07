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

    console.log('inside search', addedProducts)
    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts())
        productsToAdd(addedProducts)
    }, [dispatch, addedProducts])

    const productList = [];
    for (let product in allProducts){
        productList.push({'product_id':allProducts[product].id, 'brand_name':allProducts[product].brand_name, 'product_name':allProducts[product].product_name, 'preview_image':allProducts[product].preview_image},
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
            if (product["product_name"].match(searchTerm)) {
                const productExists = addedProducts.some((addedProduct) => addedProduct.product_id === product.product_id);

                if (!productExists) {

                    setAddedProducts((prev) => [...prev, {
                        'product_id':product.product_id,
                        'brand_name':product.brand_name,
                        'product_name': product.product_name,
                        'preview_image':product.preview_image
                    }])
                } else {
                    return;
                }
            }
        })
    };


    // removes product to developing collection
    const removeProduct = (productId) => {
        const updatedProducts = addedProducts.filter((product) => product.product_id !== productId);
        setAddedProducts(updatedProducts);
    };


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
                    const productName = product.product_name.toLowerCase();
                    const brandName = product.brand_name.toLowerCase();
                    return (searchTerm && productName.startsWith(searchTerm) && productName !== searchTerm) || (searchTerm && brandName.startsWith(searchTerm) && brandName !== searchTerm)
                })
                .map((product) => (
                    <div className="dropdown-row" key={product.product_id} onClick={() => {handleSearch(product.product_name); addProduct(product.product_name); resetSearch()}}>{product.brand_name} - {product.product_name}</div>
                ))}
            </div>

            <div className="search-comp-product-tiles-div">
                {addedProducts?.map((productTile) => (
                    <div className="search-comp-product-tile" key={productTile.product_id}>
                        <Icon className="search-comp-close-icon" icon="octicon:x-12" color="#000000" width="15" height="15" onClick={() => {removeProduct(productTile.product_id)}}/>
                        <img src={productTile.preview_image} alt={productTile.product_name} title={productTile.product_name} className="search-comp-product-tile-img" />
                        <p style={{fontWeight:"600"}}>{productTile.brand_name}</p>
                        <p>{productTile.product_name}</p>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default SearchBarAndAddProduct;
