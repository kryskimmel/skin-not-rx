import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../../../utils/OpenModalButton";
import { useModal } from "../../../../context/Modal";
import ProductInfoModal from "../../ProductModals/ProductInfoModal";
import { getCurrUserProducts } from "../../../../redux/product";
import { Icon } from '@iconify/react';
import "./SearchProductsModal.css";


function SearchProductsModal () {
    const [searchInput, setSearchInput] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [productId, setProductId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.allProducts);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getCurrUserProducts());
    }, [dispatch]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setShowDropdown(true);
    };

    const productList = useMemo(() => {
        const productList = [];
        for (let product in userProducts) {
            productList.push({
                id: userProducts[product].id,
                brand_name: userProducts[product].brand_name,
                product_name: userProducts[product].product_name,
                preview_image: userProducts[product].preview_image,
            });
        }
        return productList;
    }, [userProducts]);

    const logSearchTerm = (searchTerm) => {
        setSearchInput(searchTerm.product_name || searchTerm.brand_name);
        setProductId(searchTerm.id);
        setSearchInput("");
        setProductId(null);
    };

    useEffect(() => {
        productList.filter(
            (product) => (
                product.product_name.toLowerCase() === searchInput.toLowerCase() || 
                product.brand_name.toLowerCase() === searchInput.toLowerCase()) &&
                setProductId(product.id)
        );
        setShowDropdown(true);
    }, [productList, searchInput]);

    const handleClickOutside = (e) => {
        const searchBar = document.querySelector(".search-bar-div");
        const dropdown = document.querySelector(".search-bar-dropdown-row");
        if (
            searchBar &&
            !searchBar.contains(e.target) &&
            dropdown &&
            !dropdown.contains(e.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    
    return (
        <div className="search-bar-container">
            <div className="search-bar-close-modal-div" onClick={()=> closeModal()}>
                <Icon 
                    icon="material-symbols-light:close" 
                    width="25" 
                    height="25" 
                    color="white"
                />
            </div>
            <div className="search-bar-div">
                <input
                    type="text"
                    placeholder="Type in a product name..."
                    value={searchInput}
                    onChange={handleInputChange}
                    className="search-bar-input"
                />
                <div
                    className="search-bar-dropdown"
                    style={{
                        display: showDropdown ? "" : "none",
                    }}
                >
                    {productList
                        .filter((product) => {
                            const searchTerm = searchInput.toLowerCase();
                            const productName = product.product_name.toLowerCase();
                            const productBrandName = product.brand_name.toLowerCase();
                            return searchTerm && (productName.startsWith(searchTerm) || productBrandName.startsWith(searchTerm));
                        })
                        .map((product) => (
                            <div key={`search-${product.id}`}>
                            <OpenModalButton
                                buttonText={
                                    <div className="search-bar-dropdown-row">
                                        <img className="search-result-img" src={product.preview_image} />
                                        <div className="search-result-name-div">
                                            <p className="search-result-brandname">{product.brand_name}</p>
                                            <p className="search-result-productname">{product.product_name}</p>
                                        </div>
                                    </div>
                                }
                                modalComponent={<ProductInfoModal productId={product.id} onFavoriteChange={logSearchTerm} />}
                                onButtonClick={() => { setSearchInput(""); }}
                            />
                            </div>
                        ))}
                </div>
            </div >
        </div>
    )
}

export default SearchProductsModal;