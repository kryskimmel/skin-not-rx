import DeleteProductModal from '../DeleteProductModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import { useModal } from '../../../context/Modal';
import "./CurrentCollectionModal.css";




function CurrentCollectionModal({premadeCollectionName, items}) {
    return (
        <div className='user-products-wrapper'>
            <h1 className='user-products-h1'>{premadeCollectionName}</h1>
            <div className='user-products-div'>
                {items?.map((item) => (
                    <div className='user-products-product-tile' key={item.id}>
                        <img src={item.preview_image} alt={item.product_name} title={item.product_name} className="user-products-img" />
                        <div className='user-products-info-div'>
                            <ul>
                                <li style={{fontWeight:'600'}}>{item.brand_name}</li>
                                <li>{item.product_name}</li>
                            </ul>
                            <div className='user-products-management-buttons'>
                                <button>UPDATE</button>
                                <OpenModalButton
                                    buttonText="DELETE"
                                    modalComponent={<DeleteProductModal productId={item.id} />}
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
