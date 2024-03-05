import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavoriteCollections } from "../../../redux/favoriteCollection";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import OpenModalButton from "../../../utils/OpenModalButton";
import "./Favorites.css";

function FavoriteCollections() {
    const dispatch = useDispatch();
    const favoriteCollections = useSelector(state => state.favoriteCollections.allFavoritedCollections);
    console.log('user fave collections', favoriteCollections);
    
    useEffect(() => {
        dispatch(getFavoriteCollections());
    }, [dispatch]);

    return (
        <div className="favorite-collections-container">
            <h2 className="favorite-collections-heading">Favorite Collections</h2>
            {favoriteCollections ? (
                <div className="favorite-collections-tiles">
                    {favoriteCollections.map((faveColl) => (
                        <OpenModalButton
                            key={`${faveColl.id}-faveColl-${faveColl.collection_id}`}
                            buttonText={
                                <div className="collection-page-collections-tile-div">
                                    <h2 className="collection-page-h2">{faveColl.name}</h2>
                                    <div className="collection-page-collections-grid">
                                        {faveColl.products?.slice(0, 4)?.map((attr, idx) => (
                                            <div className="collection-page-grid-images" key={idx}>
                                                <img src={attr.preview_image} alt={attr.product_name} title={attr.product_name} className="collection-image" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
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