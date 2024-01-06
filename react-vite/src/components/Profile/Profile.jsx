import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import * as collectionActions from "../../redux/collection";
import OpenModalMenuItem from "../Modals/OpenModalMenuButton";
import CurrentCollectionModal from "../Modals/CurrentCollectionModal/CurrentCollectionModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import { Icon } from '@iconify/react';
import "./Profile.css";
import CreateCollectionModal from "../Modals/CreateCollectionModal";


function Profile () {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.product.byProductType);
    const userCollections = useSelector(state => state.collection.allCollections)
    const [selectedModal, setSelectedModal] = useState(null);

    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts())
        dispatch(collectionActions.viewCurrUserCollections())
    }, [dispatch]);

    //handles modal selection based on collection click
    const handleCollectionClick = (premadeCollectionName, items) => {
        console.log('clicked collection', premadeCollectionName)
        const premadeCollectionNames = [
          "Cleansers", "Exfoliators", "Moisturizers", "Treatments",
          "Serums", "Sunscreens", "Toners", "Face Masks",
          "Eye Serums", "Eye Creams", "Lip Repair And Protectants", "All Products"
        ];

        if (premadeCollectionNames.includes(premadeCollectionName)) {
          setSelectedModal(<CurrentCollectionModal premadeCollectionName={premadeCollectionName} items={items}/>);
        } else {
          setSelectedModal(null);
        }
      };

    return (
        <div className="profile-page-container">
            <h1 className="profile-page-h1">Product Collections</h1>
            <div className="profile-page-premade-collections-div">
                {userProducts ? Object.entries(userProducts)?.map((collection) => (
                    <div className="profile-page-collections-tile-div" key={collection[0]}>
                        <OpenModalMenuItem
                            itemText={<h2 className="profile-page-h2">{collection[0]} <span style={{color:"#4D4B4B",fontSize: "16px"}}>({collection[1].length})</span></h2>}
                            onItemClick={() => handleCollectionClick(collection[0], collection[1])}
                            modalComponent={selectedModal}
                        />
                        <div className="profile-page-collections-grid">
                            {collection[1].slice(0, 4)?.map((attr, idx) => (
                                <div className="profile-page-grid-images" key={idx}>
                                    <img src={attr.preview_image } alt={attr.product_name} title={attr.product_name} width="100px" height="100px"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )) : <h2>You have not added any products!</h2>}
            </div>
            <h1 className="profile-page-h1">Custom Collections</h1>
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
                    <div className="profile-page-collections-tile-div" key={collection.id}>
                        <h2 className="profile-page-h2">{collection.name} <span style={{color:"#4D4B4B",fontSize: "16px"}}>({collection.Products.length})</span></h2>
                        <div className="profile-page-collections-grid">
                            {collection.Products.slice(0,4)?.map((attr, idx) => (
                                <div className="profile-page-grid-images" key={idx}>
                                    <img src={attr.preview_image[0].image_url} alt={attr.product_name} title={attr.product_name} width="100px" height="100px"/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile;
