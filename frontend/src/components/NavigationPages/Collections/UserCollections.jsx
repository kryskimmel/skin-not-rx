import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../../utils/OpenModalButton";
import { getCurrUserProducts } from "../../../redux/product";
import { getCurrUserCollections } from "../../../redux/collection";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import CreateCollectionModal from "../../Modals/CollectionModals/CreateCollectionModal";
import "./UserCollections.css";

function UserCollections() {
    const dispatch = useDispatch();
    const userCollections = useSelector(state => state.collections.allCollections);

    useEffect(() => {
        dispatch(getCurrUserProducts())
        dispatch(getCurrUserCollections())
    }, [dispatch]);


    return (
        <div className="collection-page-container">
             <div className="collections-header">
                <h1 className="collection-page-h1">COLLECTIONS</h1>
                    <OpenModalButton
                        buttonText={
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <p>Create A Collection</p>
                            </div>}
                            className="collection-create-button"
                        modalComponent={<CreateCollectionModal />}
                    />
            </div>
            <div className="collection-page-custom-collections-div">
           
                {userCollections ? userCollections.map((collection) => (
                    <div key={collection.id}>
                        <OpenModalButton
                            buttonText={
                                <div className="collection-page-collections-tile-div">
                                    <h2 className="collection-page-h2">{collection.name}</h2>
                                    <div className="collection-page-collections-grid">
                                        {collection.Products?.slice(0, 4)?.map((attr, idx) => (
                                            <div className="collection-page-grid-images" key={idx}>
                                                <img src={attr.preview_image} alt={attr.product_name} title={attr.product_name} className="collection-image"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            modalComponent={<CurrentCollectionModal collectionName={collection.name} items={collection.Products} collectionId={collection.id} />}
                        />
                    </div>
                )) : <h2 className="no-collections-text" style={{ display: 'flex', alignItems: 'center' }}>You have not added any collections!</h2>}

            </div>
        </div>

    )
}

export default UserCollections;
