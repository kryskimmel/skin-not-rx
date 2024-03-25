import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrUserCollections } from "../../../../redux/collection";
import { addCollectionToFavorites, removeCollectionFromFavorites } from "../../../../redux/favoriteCollection";
import OpenModalButton from "../../../../utils/OpenModalButton";
import ProductInfoModal from "../../ProductModals/ProductInfoModal";
import UpdateCollectionModal from "../UpdateCollectionModal";
import DeleteCollectionModal from "../DeleteCollectionModal";
import { useModal } from "../../../../context/Modal";
import { Icon } from "@iconify/react";
import "./CurrentCollectionModal.css";




function CurrentCollectionModal({ collectionName, items, collectionId }) {
    const dispatch = useDispatch();
    const userCollectionById = useSelector(state => state.collections.byId[collectionId]);
    const { closeModal } = useModal();
    const optionsRef = useRef();
    const [showMenu, setShowMenu] = useState(false);

    console.log(collectionName, items, collectionId);
    console.log('collection by id??', userCollectionById)

    useEffect(() => {
        dispatch(getCurrUserCollections())
    }, [dispatch]);

    const handleStarClick = async (collId) => {
        if (userCollectionById.is_favorite === false) {
            dispatch(addCollectionToFavorites({collection_id:collId}))
            .then(() => dispatch(getCurrUserCollections()))
        } else {
            const favorite_id = userCollectionById.favorite_id;
            await dispatch(removeCollectionFromFavorites(favorite_id))
            await dispatch(getCurrUserCollections())
        }
    }

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

  
    const selectImgURL = (key) => {
        if (key.preview_image && key.preview_image[0] && key.preview_image[0].image_url) {
            return key.preview_image[0].image_url;
        } else if (key.preview_image) {
            return key.preview_image;
        } else {
            return null
        }
    };

    return (
        <div className='user-collections-wrapper'>
            <div className='collection-info-tools-div'>
                {collectionId && (
                    <>
                    <button className="favorite" onClick={(e) => {e.stopPropagation(); handleStarClick(collectionId)}}>
                        {userCollectionById?.is_favorite === false ? (
                        <Icon
                        icon='fluent:star-20-regular' 
                        width="35"
                        height="35" 
                        className="star-icon"
                        />
                        ) : (
                        <Icon
                        icon='fluent:star-20-filled' 
                        color="#9cb781"
                        width="35" 
                        height="35"
                        className="star-icon"
                        />
                        )}
                    </button>
                    <button onClick={toggleMenu}>
                        <Icon icon="ph:dots-three-outline-vertical" width="35" height="35" ref={optionsRef} />
                    </button>)
                    </>
                )}
                {showMenu && collectionId && (
                    <div className="collection-details-dropdown-container" >
                        <OpenModalButton
                            title={'Edit'}
                            buttonText={'Edit'}
                            modalComponent={<UpdateCollectionModal collectionId={collectionId} collectionName={collectionName} items={items} />}
                        />
                        <OpenModalButton
                            title={'Delete'}
                            buttonText={'Delete'}
                            modalComponent={<DeleteCollectionModal collectionId={collectionId} collectionName={collectionName} />}
                        />
                    </div>
                )}

                <OpenModalButton
                    className={'close-modal-button'}
                    title={'Close'}
                    buttonText={<Icon icon="ph:x-square-bold" width="35" height="35" />}
                    onButtonClick={() => { closeModal() }}
                />
            </div>
            <div className="user-collections-title-div">
                <h1 className='user-collections-h1'>{collectionName}</h1>
                <p style={{color:"4D4B4B", fontSize:"18px"}}>{items.length} items</p>
            </div>
            <div className='user-products-div'>
                {items?.map((item) => (
                    <div className='user-products-product-tile' key={item.id}>
                        <div className='user-products-product-tile-img-div'>
                            <img src={selectImgURL(item)} alt={item.product_name} title={item.product_name} className="user-products-img" width={175} height={175} />
                        </div>
                        <div className='user-products-info-div'>
                            <ul>
                                <li style={{ fontWeight: '600' }}>{item.brand_name}</li>
                                <li>{item.product_name}</li>
                            </ul>
                            <div className='user-products-management-buttons'>
                                <OpenModalButton
                                    buttonText="VIEW"
                                    modalComponent={<ProductInfoModal productId={item.id} />}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CurrentCollectionModal;
