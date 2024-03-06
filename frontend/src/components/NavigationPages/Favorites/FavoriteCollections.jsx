import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteCollections, removeCollectionFromFavorites } from "../../../redux/favoriteCollection";
import OpenModalButton from "../../../utils/OpenModalButton";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import { Icon } from "@iconify/react";
import "./Favorites.css";

function FavoriteCollections() {
    const dispatch = useDispatch();
    const favoriteCollections = useSelector(state => state.favoriteCollections.allFavoritedCollections);
    
    useEffect(() => {
        dispatch(getFavoriteCollections());
    }, [dispatch]);

    const handleRemoveFavorite = async (favoriteId) => {
        await dispatch(removeCollectionFromFavorites(favoriteId));
    };

    const removeFavoriteLocalStorage = (collId) => {
        const favorites = JSON.parse(localStorage.getItem('favoriteCollections'));
        delete favorites[collId];
        localStorage.setItem('favoriteCollections', JSON.stringify(favorites));
    }

    return (
        <div className="fave-coll-page-container">
            <h2 className="fave-coll-heading">Favorite Collections</h2>
            <div className="fave-search-div">
                <Icon icon="fluent:search-20-filled" width={25} height={25}/><input type="text" className="fave-search"/>
            </div>
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
                                        removeFavoriteLocalStorage(faveColl.collection_id) 
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
        </div>
    );
}

export default FavoriteCollections;