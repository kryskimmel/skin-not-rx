import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../../utils/OpenModalButton";
import CurrentCollectionModal from "../../Modals/CollectionModals/CurrentCollectionModal";
import CreateCollectionModal from "../../Modals/CollectionModals/CreateCollectionModal";
import * as productActions from "../../../redux/product";
import * as collectionActions from "../../../redux/collection";
import { Icon } from '@iconify/react';
import "./UserCollections.css";

function UserCollections() {
    const dispatch = useDispatch();
    const userCollections = useSelector(state => state.collection.allCollections);



    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts())
        dispatch(collectionActions.viewCurrUserCollections())
    }, [dispatch]);


    return (
        <div className="collection-page-container">
            <h1 className="collection-page-h1">My Custom Collections</h1>
            <div className="collection-page-custom-collections-div">
                <div className="create-custom-collection-div">
                    <OpenModalButton
                        buttonText={
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <p>Create A Collection</p>
                                <Icon icon="basil:add-outline" width="30" height="30" />
                            </div>}
                        modalComponent={<CreateCollectionModal />}
                    />
                </div>
                {userCollections ? userCollections.map((collection) => (
                    <div key={collection.id}>
                        <OpenModalButton
                            buttonText={
                                <div className="collection-page-collections-tile-div">
                                    <h2 className="collection-page-h2">{collection.name} <span style={{ color: "#4D4B4B", fontSize: "16px" }}>({collection.Products?.length})</span></h2>
                                    <div className="collection-page-collections-grid">
                                        {collection.Products?.slice(0, 4)?.map((attr, idx) => (
                                            <div className="collection-page-grid-images" key={idx}>
                                                <img src={attr.preview_image[0].image_url} alt={attr.product_name} title={attr.product_name} width="100px" height="100px" />
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
