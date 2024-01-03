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
        const {name, product_id} = allCollections[key];

        if (modifiedCollectionObj[name]) {
            modifiedCollectionObj[name].productIds.push(product_id);
        }
        else {
            modifiedCollectionObj[name] = {name, productIds:[product_id]}
        }
    }

    useEffect(() => {
        dispatch(collectionActions.getAllCollections(allCollections));
        dispatch(productActions.getAllProducts(allProducts));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])



    return (
        <>
        <div className="explore-collections-container">
            {allCollections?.map(collection =>
                <div className="collection-tile" key={collection.id}>
                    <div className="collection-tile-buttons" key={`${collection.id}-favorite`}>
                        <ul>
                            <li
                                className="collections-star-icon"
                                onMouseOver={()=> handleOnHoverStar(collection.id)}
                                onMouseOut={handleOffHoverStar}>
                                {onHoverStar !== collection.id ? <Icon icon="clarity:favorite-line" width="25" height="25"/> : <Icon className="favorite-star-icon" icon="clarity:favorite-solid" color="#f4c430" width="30" height="30" />}
                            </li>
                        </ul>
                    </div>
                    <div className="collection-info">
                        <div className="grid-image-div">
                            {collection.Products.slice(0, 4).map((product, idx) => (
                                <div className="grid-images-tile" key={idx}>
                                    <img src={product.preview_image[0].image_url} alt={product.product_name}  width={"100px"} height={"100px"} />
                                </div>
                            ))}
                        </div>

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
