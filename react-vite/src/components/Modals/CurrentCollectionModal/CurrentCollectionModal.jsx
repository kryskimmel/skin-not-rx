import DeleteProductModal from '../DeleteProductModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ProductInfoModal from '../ProductInfoModal';
// import { useModal } from '../../../context/Modal';
import "./CurrentCollectionModal.css";




function CurrentCollectionModal({collectionName, items}) {

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
            <h1 className='user-products-h1'>{collectionName} <span style={{color:"#4D4B4B", fontSize:"22px"}}>({items.length})</span></h1>
            <div className='user-products-div'>
                {items?.map((item) => (
                    <div className='user-products-product-tile' key={item.id}>
                        <img src={selectImgURL(item)} alt={item.product_name} title={item.product_name} className="user-products-img" />
                        <div className='user-products-info-div'>
                            <ul>
                                <li style={{fontWeight:'600'}}>{item.brand_name}</li>
                                <li>{item.product_name}</li>
                            </ul>
                            <div className='user-products-management-buttons'>
                                <button>UPDATE</button>
                                <OpenModalButton
                                    buttonText="DELETE"
                                    modalComponent={<DeleteProductModal
                                        brandName = {item.brand_name}
                                        productName = {item.product_name}
                                        productId={item.id}
                                    />}
                                />
                                <OpenModalButton
                                buttonText="VIEW"
                                modalComponent={<ProductInfoModal productId={item.id}/>}
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
