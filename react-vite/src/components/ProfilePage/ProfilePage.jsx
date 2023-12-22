import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import CleansersModal from "../Modals/CurrentCollectionModals/CleansersModal";
import ExfoliatorsModal from "../Modals/CurrentCollectionModals/ExfoliatorsModal";
import MoisturizersModal from "../Modals/CurrentCollectionModals/MoisturizersModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./ProfilePage.css";


function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    const productsByType = useSelector(store => store.product.byProductType);
    const allProducts = useSelector(store => store.product.allProducts)
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedModal, setSelectedModal] = useState(null);

    useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);

    const handleCollectionClick = (collectionName, items) => {
        setSelectedCollection(collectionName)
        console.log(
        'THE COLLECTION NAME', collectionName, 'THE ITEMS--', items
        )
        if (collectionName === "cleansers") {
            setSelectedModal(<CleansersModal collectionName={collectionName} items={items}/>)
        }
        else if (collectionName === "exfoliators") {
            setSelectedModal(<ExfoliatorsModal collectionName={collectionName} items={items}/>)
        }
        else if (collectionName === "moisturizers") {
            setSelectedModal(<MoisturizersModal collectionName={collectionName} items={items}/>)
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

    console.log('selected collection--', selectedCollection)
    console.log('selected modal--', selectedModal)


    return (
        <>
        <div className="profile-page-container">
            <h1 className="profile-page-h1">{user.username.toUpperCase()}'S PROFILE</h1>
            <div className="profile-page-collections-div">

                    {Object.entries(currentUsersCollections).map(([collectionName, items]) => (
                        <div key={collectionName} className="profile-page-collections-tile">
                            <OpenModalMenuItem
                                itemText={collectionName}
                                onItemClick={() => handleCollectionClick(collectionName, items)}
                                onModalClose={() => setSelectedModal(null)}
                                modalComponent={selectedModal}
                            />
                            <h2 className="collections-tile-name">{collectionName}<span style={{color:"#656565"}}> ({items.length})</span></h2>
                        </div>
                    ))}

            </div>
        </div>
        </>
    )
}

export default ProfilePage;
