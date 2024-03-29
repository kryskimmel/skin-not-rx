import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteCollections, removeCollectionFromFavorites } from "../../../redux/favoriteCollection";
import OpenModalButton from "../../../utils/OpenModalButton";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import { Icon } from "@iconify/react";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import "./Favorites.css";

function FavoriteCollections() {
    const dispatch = useDispatch();
    const favoriteCollections = useSelector(state => state.favoriteCollections.allFavoritedCollections);
    const [searchInput, setSearchInput] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [collectionId, setCollectionId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getFavoriteCollections()).then(() => setIsLoading(false));
    }, [dispatch]);

    const handleRemoveFavorite = async (favorite_id) => {
        await dispatch(removeCollectionFromFavorites(favorite_id));
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        setShowOptions(true);
    };

    const faveCollectionList = useMemo(() => {
        const faveCollectionList = [];
        if (favoriteCollections) {
            for (let faveCollection in favoriteCollections) {
                faveCollectionList.push({
                    id: favoriteCollections[faveCollection]?.id,
                    collection_id: favoriteCollections[faveCollection]?.collection_id,
                    name: favoriteCollections[faveCollection]?.name,
                    products: favoriteCollections[faveCollection]?.products,
                });
            }
        }
        return faveCollectionList;
    }, [favoriteCollections]);

    // const logSearchTerm = (searchTerm) => {
    //     setSearchInput(searchTerm.name);
    //     setProductId(searchTerm.id);
    //     setSearchInput("");
    //     setProductId(null);
    // };

    useEffect(() => {
        faveCollectionList.filter(
            (faveColl) => (
                faveColl.name?.toLowerCase() === searchInput.toLowerCase() &&
                setCollectionId(faveColl.collection_id))
        );
        setShowOptions(true);
    }, [faveCollectionList, searchInput]);

    const handleClickOutside = (e) => {
        const searchBar = document.querySelector(".fave-coll-search-div");
        const searchOptions = document.querySelector(".fave-coll-search-options-tile-btn");
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

        if (isLoading) {
            return <LoadingSpinner/>
        } else {
            return (
                <div className="fave-coll-page-container">
                    <h2 className="fave-coll-heading">FAVORITE COLLECTIONS</h2>
                    <p className="fave-coll-count-text">
                        {favoriteCollections.length ? favoriteCollections.length : 0} {favoriteCollections.length === 1 ? "item" : "items"}
                    </p>
                    <div className="fave-coll-search-div">
                        <Icon icon="fluent:search-20-filled" width={25} height={25}/>
                        <input 
                            type="text" 
                            className="fave-coll-search"
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                    </div>
                    {searchInput ? (
                        <div
                            className="fave-coll-search-options"
                            style={{display: showOptions ? "" : "none"}}
                        >
                            {faveCollectionList
                                .filter((faveColl) => {
                                    const searchTerm = searchInput.toLowerCase();
                                    const name = faveColl.name?.toLowerCase();
                                    return searchTerm && name.startsWith(searchTerm);
                                })
                                .map((faveColl) => (
                                    <div key={`search-faveColl-${faveColl.id}=${faveColl.name}`}>
                                        <OpenModalButton
                                            className="fave-coll-search-options-tile-btn"
                                            buttonText={
                                                <>
                                                    <div className="fave-coll-img-grid-div">
                                                        {faveColl.products?.slice(0, 4)?.map((attr, idx) => (
                                                            <img
                                                                key={`faveColl-${attr.preview_image}-${idx}`}
                                                                src={attr.preview_image} 
                                                                alt={attr.product_name} 
                                                                title={attr.product_name} 
                                                                className="fave-coll-tile-img" 
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="fave-search-coll-star-div" onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        handleRemoveFavorite(faveColl.id); 
                                                    }}>
                                                        <Icon 
                                                            icon='fluent:star-20-filled' 
                                                            width={25} 
                                                            height={25} 
                                                            color="#9cb781" 
                                                            className="star-icon"/>
                                                    </div>
                                                    <div className="fave-coll-title-div">
                                                        <p className="fave-coll-title">{faveColl.name}</p>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </>
                                            }
                                            modalComponent={<CurrentCollectionModal collectionName={faveColl.name} items={faveColl.products} collectionId={faveColl.collection_id} />}
                                            // onButtonClick={() => { setSearchInput("") ;}}
                                        />
                                    </div>
                                ))
                            }
        
                        </div>
                    ) : (
                    <>
                        {favoriteCollections.length ? (
                            <div className="fave-coll-tiles-div">
                                {favoriteCollections.map((faveColl) => (
                                    <OpenModalButton
                                        key={`${faveColl.id}-faveColl-${faveColl.collection_id}`}
                                        className="fave-coll-tile-btn"
                                        buttonText={
                                            <>
                                                <div className="fave-coll-img-grid-div">
                                                    {faveColl.products?.slice(0, 4)?.map((attr, idx) => (
                                                        <img
                                                            key={`${attr.preview_image}-${idx}`}
                                                            src={attr.preview_image} 
                                                            alt={attr.product_name} 
                                                            title={attr.product_name} 
                                                            className="fave-coll-tile-img" 
                                                        />
                                                    ))}
                                                </div>
                                                <div className="fave-coll-star-div" onClick={(e) => { 
                                                    e.stopPropagation(); 
                                                    handleRemoveFavorite(faveColl.id); 
                                                }}>
                                                    <Icon 
                                                        icon='fluent:star-20-filled' 
                                                        width={25}
                                                        height={25} 
                                                        color="#9cb781" 
                                                        className="star-icon"
                                                    />
                                                </div>
                                                <div className="fave-coll-title-div">
                                                    <p className="fave-coll-title">{faveColl.name}</p>
                                                </div>
                                            </>
                                        }
                                        modalComponent={<CurrentCollectionModal collectionName={faveColl.name} items={faveColl.products} collectionId={faveColl.collection_id} />}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="no-fave-coll-div">
                                <h3 className="no-fave-coll-text">You have not favorited any collections yet!</h3>
                            </div>
                        )}
                    </>
                    )}
                </div>
            );

        }
    }

export default FavoriteCollections;