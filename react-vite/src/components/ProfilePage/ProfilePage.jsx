import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import CleansersModal from "../Modals/CurrentCollectionModals/CleansersModal";
import ExfoliatorsModal from "../Modals/CurrentCollectionModals/ExfoliatorsModal";
import TreatmentsModal from "../Modals/CurrentCollectionModals/TreatmentsModal";
import SerumsModal from "../Modals/CurrentCollectionModals/SerumsModal";
import SunscreensModal from "../Modals/CurrentCollectionModals/SunscreensModal";
import MoisturizersModal from "../Modals/CurrentCollectionModals/MoisturizersModal";
import TonersModal from "../Modals/CurrentCollectionModals/TonersModal";
import FaceMasksModal from "../Modals/CurrentCollectionModals/FaceMasksModal";
import EyeSerumsModal from "../Modals/CurrentCollectionModals/EyeSerums";
import EyeCreamsModal from "../Modals/CurrentCollectionModals/eyeCreamsModal";
import LipRepairAndProtectantsModal from "../Modals/CurrentCollectionModals/LipRepairAndProtectantsModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./ProfilePage.css";


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
        if (selectedCollection === "cleansers") {
            setSelectedModal(<CleansersModal collectionName={selectedCollection} items={items}/>)
        }
        else if (selectedCollection === "exfoliators") {
            setSelectedModal(<ExfoliatorsModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "moisturizers") {
            setSelectedModal(<MoisturizersModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "treatments") {
            setSelectedModal(<TreatmentsModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "serums") {
            setSelectedModal(<SerumsModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "sunscreens") {
            setSelectedModal(<SunscreensModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "toners") {
            setSelectedModal(<TonersModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "faceMasks") {
            setSelectedModal(<FaceMasksModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "eyeSerums") {
            setSelectedModal(<EyeSerumsModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "eyeCreams") {
            setSelectedModal(<EyeCreamsModal collectionName={selectedCollection} items={items}/>)
        }
        else if (collectionName === "lipRepairAndProtectants") {
            setSelectedModal(<LipRepairAndProtectantsModal collectionName={selectedCollection} items={items}/>)
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
            <div className="profile-page-collections-div">

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
        </div>
        </>
    )
}

export default ProfilePage;
