import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../../redux/collection";
import * as productActions from "../../../redux/product";
import { Icon } from '@iconify/react';
import "./ExploreCollections.css"

function ExploreCollections() {
    const dispatch = useDispatch();
    const allCollections = useSelector(state => state.collection.allCollections);
    const allProducts = useSelector(state => state.product.allProducts);
    const [onHoverStar, setOnHoverStar] = useState(null)


    const handleOnHoverStar = (collectionId) => {
        setOnHoverStar(collectionId)
    }

    const handleOffHoverStar = () => {
        setOnHoverStar(null)
    }

    const modifiedCollectionObj = {};
    for (const key in allCollections) {
        if (allCollections.hasOwnProperty(key)) {
            const {id, name, product_id} = allCollections[key];

            if (modifiedCollectionObj[name]) {
                modifiedCollectionObj[name].productIds.push(product_id);
            }
            else {
                modifiedCollectionObj[name] = {name, productIds:[product_id]}
            }
        }
    };
    console.log('The modified collection:-->', modifiedCollectionObj)

    useEffect(() => {
        dispatch(collectionActions.getAllCollections(allCollections));
        dispatch(productActions.getAllProducts(allProducts));
    }, [dispatch])


    // const uniqueCollectionsObj = {};
    // for (const key in allCollections){
    //     if (allCollections.hasOwnProperty(key)) {
    //         const { name, product_id } = allCollections[key];

    //         if (uniqueCollectionsObj[name]) {
    //             uniqueCollectionsObj[name].productIds.push(product_id);
    //         }
    //         else {
    //             uniqueCollectionsObj[name] = {name,productIds: [product_id]}
    //         }
    //     }
    // };
    // const uniqueCollectionsList = Object.values(uniqueCollectionsObj);
    // console.log('unique coll list -->', uniqueCollectionsList)





    return (
        <>
        <div className="explore-collections-container">
            {allCollections?.map(collection =>
                <div className="collection-tile" key={collection.id}>
                    <div className="collection-tile-buttons" key={`${collection.id}-favorite`}>
                        <ul>
                            <li
                                className="explore-page-star-icon"
                                onMouseOver={()=> handleOnHoverStar(collection.id)}
                                onMouseOut={handleOffHoverStar}>
                                {onHoverStar !== collection.id ? <Icon icon="clarity:favorite-line" width="25" height="25"/> : <Icon className="favorite-star-icon" icon="clarity:favorite-solid" color="#f4c430" width="30" height="30" />}
                            </li>
                        </ul>
                    </div>
                    {/* <img src={collection.preview_image} alt={collection.name} width={"200px"} height={"200px"} style={{objectFit:"cover", borderRadius:"15px"}}/> */}
                    <div className="collection-info">
                        {allProducts?.filter(product => product.id === collection.product_id).map(item => <img key={item.id} src={item.preview_image} alt={item.product_name} width={"200px"} height={"200px"} style={{objectFit:"cover", borderRadius:"15px"}}/>
                        )}
                        <ul>
                            <li>{collection.name}</li>
                        </ul>
                    </div>

                </div>
            )}
        </div>

        </>
    )
}

export default ExploreCollections;
