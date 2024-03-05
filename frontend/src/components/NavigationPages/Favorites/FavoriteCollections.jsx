import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavoriteCollections } from "../../../redux/favoriteCollection";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import OpenModalButton from "../../../utils/OpenModalButton";
import { Icon } from "@iconify/react";
import "./Favorites.css";

function FavoriteCollections() {
    const dispatch = useDispatch();
    const favoriteCollections = useSelector(state => state.favoriteCollections.allFavoritedCollections);
    console.log('user fave collections', favoriteCollections);
    
    useEffect(() => {
        dispatch(getFavoriteCollections());
    }, [dispatch]);

    return (
        <div className="fave-coll-page-container">
            <h2 className="fave-coll-heading">Favorite Collections</h2>
            {favoriteCollections ? (
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
                                    <div className="fave-coll-star-div">
                                        <Icon 
                                            icon='fluent:star-20-filled' 
                                            width={25}
                                            height={25} 
                                            color="#FEDC56" 
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
                <div>
                    <h2>Nothing to display here</h2>
                </div>
            )}
        </div>
    );
}

export default FavoriteCollections;