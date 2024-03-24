import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../../utils/OpenModalButton";
import { getCurrUserProducts } from "../../../redux/product";
import { getCurrUserCollections} from "../../../redux/collection";
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
                {isLoading ? 
                (<LoadingSpinner/>) :
                !userCollections.length ? 
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

export default UserCollections;