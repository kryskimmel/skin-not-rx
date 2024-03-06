import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteProducts, removeProductFromFavorites } from "../../../redux/favoriteProduct";
import OpenModalButton from "../../../utils/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import { Icon } from "@iconify/react";
import "./Favorites.css";

function FavoriteProducts() {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.favoriteProducts.allFavoritedProducts);
    const [searchInput, setSearchInput] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        dispatch(getFavoriteProducts());
    }, [dispatch]);

    const handleRemoveFavorite = async (favoriteId) => {
        await dispatch(removeProductFromFavorites(favoriteId));
    };

    const removeFavoriteLocalStorage = (productId) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts'));
        delete favorites[productId];
        localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setShowOptions(true);
    };

    const faveProductList = useMemo(() => {
        const faveProductList = [];
        for (let faveProduct in favoriteProducts) {
            faveProductList.push({
                id: favoriteProducts[faveProduct].product_details.id,
                brand_name: favoriteProducts[faveProduct].product_details.brand_name,
                product_name: favoriteProducts[faveProduct].product_details.product_name,
                preview_image: favoriteProducts[faveProduct].product_details.preview_image,
            });
        }
        return faveProductList;
    }, [favoriteProducts]);

    // const logSearchTerm = (searchTerm) => {
    //     setSearchInput(searchTerm.product_name || searchTerm.brand_name);
    //     setProductId(searchTerm.id);
    //     setSearchInput("");
    //     setProductId(null);
    // };

    useEffect(() => {
        faveProductList.filter(
            (faveProd) => (
                faveProd.product_name.toLowerCase() === searchInput.toLowerCase() ||
                faveProd.brand_name.toLowerCase() === searchInput.toLowerCase()) &&
                setProductId(faveProd.id)
        );
        setShowOptions(true);
    }, [faveProductList, searchInput]);

    const handleClickOutside = (e) => {
        const searchBar = document.querySelector(".fave-search-div");
        const searchOptions = document.querySelector(".fave-search-options-row");
        if (
            searchBar &&
            !searchBar.contains(e.target) &&
            searchOptions &&
            !searchOptions.contains(e.target)
        ) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="fave-prod-page-container">
            <h2 className="fave-prod-heading">Favorite Products</h2>
            <div className="fave-search-div">
                <Icon icon="fluent:search-20-filled" width={25} height={25}/>
                <input 
                    type="text" 
                    className="fave-search"
                    value={searchInput}
                    onChange={handleInputChange}
                />
            </div>
            <div 
                className="fave-search-options"
                style={{display: showOptions ? "" : "none"}}
            >
            {faveProductList
                .filter((faveProd) => {
                    const searchTerm = searchInput.toLowerCase();
                    const productName = faveProd.product_name.toLowerCase();
                    const productBrandName = faveProd.brand_name.toLowerCase();
                    return searchTerm && (productName.startsWith(searchTerm) || productBrandName.startsWith(searchTerm));
                })
                .map((faveProduct) =>(
                    <div key={`search-faveProd-${faveProduct.id}=${faveProduct.product_name}`}>
                        <OpenModalButton
                            className="fave-search-options-tile-btn"
                            buttonText={
                                <>
                                    <img 
                                        src={faveProduct.preview_image}
                                        className="fave-search-result-img"  
                                    />
                                    <div className="fave-search-prod-star-div" onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handleRemoveFavorite(faveProduct.id); 
                                        removeFavoriteLocalStorage(faveProduct.product_id) 
                                    }}>
                                        <Icon 
                                            icon='fluent:star-20-filled' 
                                            width={25} 
                                            height={25} 
                                            color="#9cb781" 
                                            className="star-icon"/>
                                    </div>
                                    <div>
                                        <ul className="fave-prod-tile-info-ul">
                                            <li style={{ fontWeight: "600" }}>{faveProduct.brand_name}</li>
                                            <li>{faveProduct.product_name}</li>
                                        </ul>
                                    </div>
                                </>
                            }
                            modalComponent={<ProductInfoModal productId={faveProduct.id} />}
                            // onButtonClick={() => { setSearchInput("") ;}}
                        />
                    </div>
                ))
            }
            </div>
            {favoriteProducts.length ? (
                <div className="fave-prod-tiles-div">
                    {favoriteProducts.map((faveProd) => (
                        <OpenModalButton
                            key={`${faveProd.id}-faveProd-${faveProd.product_id}`}
                            className="fave-prod-tile-btn"
                            buttonText={
                                <>
                                    <img 
                                        src={faveProd.product_details?.preview_image} 
                                        className="fave-prod-tile-img" 
                                    />
                                    <div className="fave-prod-star-div" onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handleRemoveFavorite(faveProd.id); 
                                        removeFavoriteLocalStorage(faveProd.product_id) 
                                    }}>
                                        <Icon 
                                            icon='fluent:star-20-filled' 
                                            width={25} 
                                            height={25} 
                                            color="#9cb781" 
                                            className="star-icon"/>
                                    </div>
                                    <div>
                                        <ul className="fave-prod-tile-info-ul">
                                            <li style={{ fontWeight: "600" }}>{faveProd.product_details?.brand_name}</li>
                                            <li>{faveProd.product_details?.product_name}</li>
                                        </ul>
                                    </div>
                                </>
                            }
                            modalComponent={<ProductInfoModal productId={faveProd.product_id} />}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-fave-prod-div">
                    <h3 className="no-fave-prod-text">You have not favorited any products yet!</h3>
                </div>
            )}
        </div>
    );
}

export default FavoriteProducts;