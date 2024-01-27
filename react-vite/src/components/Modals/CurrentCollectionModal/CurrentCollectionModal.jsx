import { useState, useEffect, useRef } from 'react';
import DeleteProductModal from '../DeleteProductModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ProductInfoModal from '../ProductInfoModal';
import UpdateCollectionModal from '../UpdateCollectionModal';
import DeleteCollectionModal from '../DeleteCollectionModal';
import { useModal } from '../../../context/Modal';
import { Icon } from '@iconify/react';
import "./CurrentCollectionModal.css";




function CurrentCollectionModal({ collectionName, items, collectionId }) {
    const { closeModal } = useModal();
    const optionsRef = useRef();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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

    const closeMenu = () => setShowMenu(false);

    console.log(showMenu, 'show menu??')


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
        <div className='user-products-wrapper'>
            <div className='collection-info-tools-div'>
                {collectionId && (
                    <button onClick={toggleMenu}>
                        <Icon icon="ph:dots-three-outline-vertical" width="30" height="30" ref={optionsRef} />
                    </button>)
                }
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
                    buttonText={<Icon icon="ph:x-square-bold" width="30" height="30" />}
                    onButtonClick={() => { closeModal() }}
                />
            </div>
            <h1 className='user-products-h1'>{collectionName} <span style={{ color: "#4D4B4B", fontSize: "22px" }}>({items.length})</span></h1>

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
