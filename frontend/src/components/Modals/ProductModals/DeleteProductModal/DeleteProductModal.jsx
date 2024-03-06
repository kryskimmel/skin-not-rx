import { useDispatch } from "react-redux";
import { removeProduct, getCurrUserProducts } from "../../../../redux/product";
import { useModal } from "../../../../context/Modal";
import { Icon } from '@iconify/react';
import "./DeleteProductModal.css";

function DeleteProductModal({brandName, productName, productId}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleYes = async (e) => {
        e.preventDefault();
        const productRemoved = await dispatch(removeProduct(productId));
        closeModal();
        if (productRemoved) {
            await dispatch(getCurrUserProducts());
            window.location.reload();
        } else {
            throw new Error('Could not delete your product')
        }
    };

    const handleNo = () => {
        closeModal()
    };


    return (
        <div className="delete-product-modal-wrapper">
            <div className="delete-product-modal-div">
                <Icon icon="ph:warning-duotone" color="red" width="50" height="50" />
                <h1 className="delete-product-modal-heading">Confirm Delete</h1>
                <h4 className="delete-product-modal-subheading">Are you sure you want to delete: <span style={{color:"#000435"}}>{brandName} {productName}</span>?</h4>
                <div className="delete-product-modal-buttons">
                    <button className="yes-button" onClick={handleYes}>Yes</button>
                    <button className="no-button" onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProductModal;