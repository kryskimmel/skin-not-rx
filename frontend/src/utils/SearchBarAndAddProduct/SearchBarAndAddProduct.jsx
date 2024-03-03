import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import { Icon } from '@iconify/react';
import "./SearchBarAndAddProduct.css";

function SearchBarAndAddProduct ({ productsToAdd }) {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);
    const [searchInput, setSearchInput] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [listAllProducts, setListAllProducts] = useState(false);

    console.log('inside search', addedProducts)
    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts())
        productsToAdd(addedProducts)
    }, [dispatch, addedProducts])

    const productList = [];
    for (let product in allProducts){
        productList.push({'id':allProducts[product].id, 'brand_name':allProducts[product].brand_name, 'product_name':allProducts[product].product_name, 'preview_image':allProducts[product].preview_image},
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
                const productExists = addedProducts.some((addedProduct) => addedProduct.id === product.id);

                if (!productExists) {

                    setAddedProducts((prev) => [...prev, {
                        'id':product.id,
                        'brand_name':product.brand_name,
                        'product_name': product.product_name,
                        'preview_image':product.preview_image
                    }])
                    setListAllProducts(false)
                } else {
                    setListAllProducts(false)
                    return;
                }
            }
        })
    };


    // removes product fromn developing collection
    const removeProduct = (productId) => {
        const updatedProducts = addedProducts.filter((product) => product.id !== productId);
        setAddedProducts(updatedProducts);
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
            </div>
            {listAllProducts && (
                <div>
                    <ul className="full-prod-list-ul">
                        <p style={{marginBottom:'10px',color: '#4d4b4b'}}>{allProducts.length} products</p>
                        {productList.map((product) => (
                            <li 
                                key={`product-item-search-${product.product_name}-${product.id}`}
                                className="full-prod-list-li"
                                onClick={() => addProduct(product.product_name)}>
                                {product.brand_name}: {product.product_name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="dropdown">
                {productList.filter(product => {
                    const searchTerm = searchInput.toLowerCase();
                    const productName = product.product_name.toLowerCase();
                    const brandName = product.brand_name.toLowerCase();
                    return (searchTerm && productName.startsWith(searchTerm) && productName !== searchTerm) || (searchTerm && brandName.startsWith(searchTerm) && brandName !== searchTerm)
                })
                .map((product) => (
                    <div className="dropdown-row" key={product.id} onClick={() => {handleSearch(product.product_name); addProduct(product.product_name); resetSearch()}}>{product.brand_name} - {product.product_name}</div>
                ))}
            </div>

            <div className="search-comp-product-tiles-div">
                {addedProducts?.map((productTile) => (
                    <div className="search-comp-product-tile" key={productTile.id}>
                        <img src={productTile.preview_image} alt={productTile.product_name} title={`${productTile.brand_name}: ${productTile.product_name}`} className="search-comp-product-tile-img" />
                        <button 
                            className="remove-product-button"
                            onClick={() => {removeProduct(productTile.id)}}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchBarAndAddProduct;