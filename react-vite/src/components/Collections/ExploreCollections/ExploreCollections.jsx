import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../../redux/collection";
import { Icon } from '@iconify/react';
import "./ExploreCollections.css"

function ExploreCollections() {
    const dispatch = useDispatch();
    const allCollections = useSelector(state => state.product.allCollections);
    const [onHoverStar, setOnHoverStar] = useState(null)

    useEffect(() => {
        dispatch(collectionActions.getAllCollections(allCollections))
    }, [dispatch, allCollections])

    const handleOnHoverStar = (collectionId) => {
        setOnHoverStar(collectionId)
    }

    const handleOffHoverStar = () => {
        setOnHoverStar(null)
    }
    console.log('all collections---', allCollections)


    return (
        <>
        <div className="explore-collections-container">
            {allCollections && allCollections.map(product =>
                <div className="collection-tile" key={product.id}>
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
