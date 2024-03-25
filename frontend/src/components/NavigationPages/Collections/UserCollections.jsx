import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../../utils/OpenModalButton";
import { getCurrUserProducts } from "../../../redux/product";
import { getCurrUserCollections} from "../../../redux/collection";
import { addCollectionToFavorites, removeCollectionFromFavorites } from "../../../redux/favoriteCollection"; 
import SearchCollectionsModal from "../../Modals/CollectionModals/SearchCollectionsModal";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import CreateCollectionModal from "../../Modals/CollectionModals/CreateCollectionModal";
import { Icon } from "@iconify/react";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import "./UserCollections.css";

function UserCollections() {
    const dispatch = useDispatch();
    const userCollections = useSelector(state => state.collections.allCollections);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getCurrUserProducts())
        dispatch(getCurrUserCollections()).then(() => setIsLoading(false))
    }, [dispatch]);

    const handleStarClick = async (collId) => {
        if (userCollections[collId-1].is_favorite === false) {
            dispatch(addCollectionToFavorites({collection_id:collId}))
            .then(() => dispatch(getCurrUserCollections()))
        } else {
            const favorite_id = userCollections[collId-1].favorite_id;
            await dispatch(removeCollectionFromFavorites(favorite_id))
            await dispatch(getCurrUserCollections())
        }
    }

    if (isLoading) {
        return <LoadingSpinner/>
    } else {
        return (
            <div className="coll-page-container">
                 <div className="coll-header-div">
                    <h1 className="coll-heading">COLLECTIONS</h1>
                    <p className="coll-count-text">{userCollections.length ? userCollections.length : 0} {userCollections.length === 1 ? "item" : "items"}</p>
                    <div className="coll-heading-btns-div">
                        <OpenModalButton
                            buttonText={
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p>Create A Collection</p>
                                </div>}
                            className="coll-create-btn"
                            modalComponent={<CreateCollectionModal />}
                        />
                        <OpenModalButton
                            buttonText={<Icon icon="fluent:search-20-filled" width={20} height={20}/>}
                            className="coll-search-btn"
                            modalComponent={<SearchCollectionsModal />}
                        />
                    </div>
                </div>
                <div className="coll-tiles-div">
                    {!userCollections.length ? 
                    (<div className="no-collections-div">
                        <p className="no-collections-text">You have not created any collections!</p>
                    </div>) : 
                    (userCollections.map((collection) => (
                        <div key={`colltile-${collection.id}-${collection.name}`}>
                            <OpenModalButton
                                className="coll-tile-btn"
                                buttonText={
                                    <>
                                        <div className="coll-img-grid-div">
                                            {collection.Products?.slice(0, 4)?.map((attr, idx) => (
                                                <img
                                                    key={`${attr.preview_image}-${idx}-collimgs`}
                                                    src={attr.preview_image} 
                                                    alt={attr.product_name} 
                                                    title={attr.product_name} 
                                                    className="coll-tile-img" 
                                                />
                                            ))}
                                        </div>
                                        <div className="coll-star-div" onClick={(e) => {e.stopPropagation(); handleStarClick(collection.id)}}>
                                            {collection.is_favorite === false ? (
                                            <Icon
                                            icon='fluent:star-20-regular' 
                                            width={25} 
                                            height={25} 
                                            className="star-icon"
                                            />
                                            ) : (
                                            <Icon
                                            icon='fluent:star-20-filled' 
                                            color="#9cb781"
                                            width={25} 
                                            height={25} 
                                            className="star-icon"
                                            />
                                            )}
                                        </div>
                                        <div className="coll-title-div">
                                            <p className="coll-title">{collection.name}</p>
                                        </div>
                                    </>
                                }
                                modalComponent={<CurrentCollectionModal collectionName={collection.name} items={collection.Products} collectionId={collection.id} />}
                            />
                        </div>
                    )))}
                </div>
            </div>
        )
    }
}

export default UserCollections;