import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import OpenModalMenuItem from "../../Modals/OpenModalMenuButton";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import CurrentCollectionModal from "../../Modals/CurrentCollectionModal";
import CreateCollectionModal from "../../Modals/CreateCollectionModal";
import * as productActions from "../../../redux/product";
import * as collectionActions from "../../../redux/collection"
import { Icon } from '@iconify/react';
import "./UserCollections.css";

function UserCollections () {
        const dispatch = useDispatch();
        const userProducts = useSelector(state => state.product.byProductType);
        const userCollections = useSelector(state => state.collection.allCollections)


        useEffect(() => {
            dispatch(productActions.viewCurrUserProducts())
            dispatch(collectionActions.viewCurrUserCollections())
        }, [dispatch]);


        return (
            <div className="profile-page-container">
                <h1 className="profile-page-h1">My Product Collections</h1>
                <div className="profile-page-premade-collections-div">
                    {userProducts ? Object.entries(userProducts)?.map((collection) => (
                        <div key={collection[0]}>
                            <OpenModalButton
                                buttonText={
                                    <div className="profile-page-collections-tile-div">
                                         <h2 className="profile-page-h2">{collection[0]} <span style={{color:"#4D4B4B",fontSize: "16px"}}>({collection[1].length})</span></h2>
                                         <div className="profile-page-collections-grid">
                                            {collection[1].slice(0, 4)?.map((attr, idx) => (
                                                <div className="profile-page-grid-images" key={idx}>
                                                    <img src={attr.preview_image } alt={attr.product_name} title={attr.product_name} width="100px" height="100px"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                }
                                modalComponent={<CurrentCollectionModal collectionName={collection[0]} items={collection[1]}/>}
                            />
                        </div>
                    )) : <h2>You have not added any products!</h2>}
                </div>
                <h1 className="profile-page-h1">My Custom Collections</h1>
                <div className="profile-page-custom-collections-div">
                    <div className="create-custom-collection-div">
                    <OpenModalButton
                        buttonText={
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                <p>Create A Collection</p>
                                <Icon icon="basil:add-outline" width="30" height="30" />
                            </div>}
                        modalComponent={<CreateCollectionModal/>}
                        />
                    </div>
                    {userCollections?.map((collection) => (
                        <div key={collection.id}>
                            <OpenModalButton
                                buttonText={
                                <div className="profile-page-collections-tile-div">
                                    <h2 className="profile-page-h2">{collection.name} <span style={{color:"#4D4B4B",fontSize: "16px"}}>({collection.Products?.length})</span></h2>
                                    <div className="profile-page-collections-grid">
                                    {collection.Products?.slice(0,4)?.map((attr, idx) => (
                                        <div className="profile-page-grid-images" key={idx}>
                                            <img src={attr.preview_image[0].image_url} alt={attr.product_name} title={attr.product_name} width="100px" height="100px"/>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                }
                                modalComponent={<CurrentCollectionModal collectionName={collection.name} items={collection.Products} collectionId={collection.id} />}
                            />
                        </div>
                    ))}
                </div>
            </div>

    )
}

export default UserCollections;
