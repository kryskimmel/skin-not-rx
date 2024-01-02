import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import * as collectionActions from "../../redux/collection";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CurrentCollectionModal from "../Modals/CurrentCollectionModal/CurrentCollectionModal";
import OpenModalButton from "../Modals/OpenModalButton/OpenModalButton";
import { Icon } from '@iconify/react';
import "./Profile.css";
import CreateCollectionModal from "../Modals/CreateCollectionModal";


function Profile () {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user);
    const userProducts = useSelector(state => state.product.byProductType);
    const userCollections = useSelector(state => state.collection.allCollections)
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedModal, setSelectedModal] = useState(null);

    useEffect(() => {
        dispatch(productActions.viewCurrUserProducts())
        dispatch(collectionActions.viewCurrUserCollections())
    }, [dispatch])

    console.log('the users collecitons', userCollections)

    const handleCollectionClick = (collectionName, items) => {
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

    // const handleCollectionClick = (collectionName, items) => {
    //     const validCollectionNames = [
    //       "Cleansers", "Exfoliators", "Moisturizers", "Treatments",
    //       "Serums", "Sunscreens", "Toners", "Face Masks",
    //       "Eye Serums", "Eye Creams", "Lip Repair And Protectants", "All"
    //     ];

    //     if (validCollectionNames.includes(collectionName)) {
    //       setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>);
    //     } else {
    //       setSelectedModal(null);
    //     }
    //   };

    return (
        <div className="profile-page-container">
            <h1 className="profile-page-h1">Product Collections</h1>
            <div className="profile-page-premade-collections-div">
                {Object.entries(userProducts)?.map((collection) => (
                    <div className="profile-page-collections-tile-div" key={collection[0]}>
                        <h2 className="profile-page-h2">{collection[0]} <span style={{color:"#4D4B4B",fontSize: "16px"}}>({collection[1].length})</span></h2>
                        <div className="profile-page-collections-grid">
                            {collection[1].slice(0, 4)?.map((attr, idx) => (
                                <div className="profile-page-grid-images" key={idx}>
                                    <img src={attr.preview_image } alt={attr.product_name} title={attr.product_name} width="100px" height="100px"/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
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
                    <div className="profile-page-collections-tile-div">
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






// function Profile() {
//     const dispatch = useDispatch();
//     const user = useSelector(store => store.session.user);
//     const productsByType = useSelector(store => store.product.byProductType);
//     // const allProducts = useSelector(store => store.product.allProducts)
//     const [selectedCollection, setSelectedCollection] = useState(null);
//     const [selectedModal, setSelectedModal] = useState(null);

//     useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);

//     //Handle which modal to display based on collection name
//     const handleCollectionClick = (collectionName, items) => {
//         setSelectedCollection(collectionName)
//         console.log(
//         'THE COLLECTION NAME', collectionName, 'THE ITEMS--', items
//         )
//         if (selectedCollection === "Cleansers") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (selectedCollection === "Exfoliators") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Moisturizers") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Treatments") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Serums") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Sunscreens") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Toners") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Face Masks") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Eye Serums") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Eye Creams") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "Lip Repair And Protectants") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else if (collectionName === "All") {
//             setSelectedModal(<CurrentCollectionModal collectionName={selectedCollection} items={items}/>)
//         }
//         else {
//             setSelectedModal(null)
//         }
//     };


//     const currentUsersCollections = {};

//     Object.entries(productsByType).forEach(([productType, products]) => {
//     const userProducts = products.filter((product) => product.user_id === user.id);
//     currentUsersCollections[productType] = userProducts;
//     });

//     // console.log('selected collection--', selectedCollection)
//     // console.log('selected modal--', selectedModal)


//     return (
//         <>
//         <div className="profile-page-container">
//             <h1 className="profile-page-h1">{`${user.username.toUpperCase()}'S PROFILE`}</h1>
//             <div className="profile-page-premade-collections-div">
//                     {Object.entries(currentUsersCollections).map(([collectionName, items]) => (
//                         <div key={collectionName} className="profile-page-collections-tile">
//                              <OpenModalMenuItem
//                                 itemText={<h2 className="collections-tile-name">{collectionName}<span style={{color:"#656565"}}> ({items.length})</span></h2>}
//                                 onItemClick={() => handleCollectionClick(collectionName, items)}
//                                 onModalClose={() => setSelectedModal(null)}
//                                 modalComponent={selectedModal}
//                             />
//                         </div>
//                     ))}
//             </div>
//             <div className="profile-page-custom-collections-div">
//                 <h2>Custom Collections</h2>
//                 <div className="custom-collections">
//                     <OpenModalButton
//                     buttonText={
//                         <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
//                             <p>Create A Collection</p>
//                             <Icon icon="basil:add-outline" width="30" height="30" />
//                         </div>}
//                     modalComponent={<CreateCollectionModal/>}
//                     />
//                 </div>

//             </div>
//         </div>
//         </>
//     )
// }

// export default Profile;
