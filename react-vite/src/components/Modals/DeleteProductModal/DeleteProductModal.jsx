import { useDispatch } from "react-redux";
import * as ProductActions from "../../../redux/product";
import { useModal } from "../../../context/Modal";
import { Icon } from '@iconify/react';
import "./DeleteProductModal.css";


function DeleteProductModal({brandName, productName, productId}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    console.log(productId, ':productId')

    const handleYes = async (e) => {
        e.preventDefault();
        await dispatch(ProductActions.removeProduct(productId));
        closeModal();
        await dispatch(ProductActions.viewCurrUserProducts());
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
