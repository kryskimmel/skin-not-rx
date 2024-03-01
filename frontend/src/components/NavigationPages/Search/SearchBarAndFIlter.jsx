import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { Icon } from '@iconify/react';
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import OpenModalButton from "../../../utils/OpenModalButton";
import * as ProductActions from "../../../redux/product";
import "./SearchBarAndFilter.css"


function SearchBarAndFilter({ showSearch, searchRef }) {
    const [searchInput, setSearchInput] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [productId, setProductId] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleSearchBarDisplay = showSearch ? "block" : "none"
    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.product.allProducts);

    useEffect(() => {
        dispatch(ProductActions.viewCurrUserProducts())
    }, [dispatch])


    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setIsDropdownVisible(true);
    };

    const productList = [];
    for (let product in allProducts) {
        productList.push({
            id: allProducts[product].id,
            brand_name: allProducts[product].brand_name,
            product_name: allProducts[product].product_name,
            preview_image: allProducts[product].preview_image,
        });
    }

    const logSearchTerm = (searchTerm) => {
        setSearchInput(searchTerm.product_name || searchTerm.brand_name);
        setProductId(searchTerm.id);
        //
        setSearchInput("");
        setProductId(null);
    };

    useEffect(() => {
        productList.filter(
            (product) =>
                (product.product_name.toLowerCase() === searchInput.toLowerCase() || product.brand_name.toLowerCase() === searchInput.toLowerCase()) &&
                setProductId(product.id)
        );
        setIsDropdownVisible(true);
    }, [productList, searchInput]);

    const handleClickOutside = (e) => {
        const searchBar = document.querySelector(".searchBarSmall");
        const dropdown = document.querySelector(".search-dropdown-row");

        if (
            searchBar &&
            !searchBar.contains(e.target) &&
            dropdown &&
            !dropdown.contains(e.target)
        ) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="search-bar-wrapper" style={{ display: toggleSearchBarDisplay }} ref={searchRef}>
            <input
                type="text"
                placeholder="Type in a product name..."
                value={searchInput}
                onChange={handleInputChange}
                className="search-bar-div"
            />
            <div
                className="search-dropdown"
                style={{
                    display: isDropdownVisible ? "" : "none",
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
                                className="search-dropdown-row-button"
                                buttonText={
                                    <div className="search-dropdown-row">
                                        <img className="search-result-img" src={product.preview_image} />
                                        <div className="search-result-name">
                                            <div>{product.brand_name}: {product.product_name}</div>
                                        </div>
                                    </div>
                                }
                                modalComponent={<ProductInfoModal productId={product.id} />}
                                onButtonClick={() => { logSearchTerm(product); setSearchInput("") }}
                            />
                        </div>
                    ))}
            </div>
        </div >
    )
}

export default SearchBarAndFilter;