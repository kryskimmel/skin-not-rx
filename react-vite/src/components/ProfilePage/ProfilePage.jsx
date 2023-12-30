import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CurrentCollectionModal from "../Modals/CurrentCollectionModal/CurrentCollectionModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import { Icon } from '@iconify/react';
import "./ProfilePage.css";
import CreateCollectionModal from "../Modals/CreateCollectionModal";


function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    const productsByType = useSelector(store => store.product.byProductType);
    // const allProducts = useSelector(store => store.product.allProducts)
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedModal, setSelectedModal] = useState(null);

    useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);

    //Handle which modal to display based on collection name
    const handleCollectionClick = (collectionName, items) => {
        setSelectedCollection(collectionName)
        console.log(
        'THE COLLECTION NAME', collectionName, 'THE ITEMS--', items
        )
        if (selectedCollection === "Cleansers") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (selectedCollection === "Exfoliators") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Moisturizers") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Treatments") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Serums") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Sunscreens") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Toners") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Face Masks") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Eye Serums") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Eye Creams") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "Lip Repair And Protectants") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "All") {
            setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
        }
        else {
            setSelectedModal(null)
        }
    };


    const currentUsersCollections = {};

    Object.entries(productsByType).forEach(([productType, products]) => {
    const userProducts = products.filter((product) => product.user_id === user.id);
    currentUsersCollections[productType] = userProducts;
    });

    // console.log('selected collection--', selectedCollection)
    // console.log('selected modal--', selectedModal)


    return (
        <>
        <div className="profile-page-container">
            <h1 className="profile-page-h1">{`${user.username.toUpperCase()}'S PROFILE`}</h1>
            <div className="profile-page-premade-collections-div">
                    {Object.entries(currentUsersCollections).map(([collectionName, items]) => (
                        <div key={collectionName} className="profile-page-collections-tile">
                             <OpenModalMenuItem
                                itemText={<h2 className="collections-tile-name">{collectionName}<span style={{color:"#656565"}}> ({items.length})</span></h2>}
                                onItemClick={() => handleCollectionClick(collectionName, items)}
                                onModalClose={() => setSelectedModal(null)}
                                modalComponent={selectedModal}
                            />
                        </div>
                    ))}
            </div>
            <div className="profile-page-custom-collections-div">
                <h2>Custom Collections</h2>
                <div className="custom-collections">
                    <OpenModalButton
                    buttonText={
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <p>Create A Collection</p>
                            <Icon icon="basil:add-outline" width="30" height="30" />
                        </div>}
                    modalComponent={<CreateCollectionModal/>}
                    />
                </div>

            </div>
        </div>
        </>
    )
}

export default ProfilePage;
