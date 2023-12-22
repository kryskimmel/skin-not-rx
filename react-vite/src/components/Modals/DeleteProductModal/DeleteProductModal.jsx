import {useEffect} from "react";
import { useDispatch } from "react-redux";
import * as ProductActions from "../../../redux/product";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../../context/Modal";
import "./DeleteProductModal.css";


function DeleteProductModal({productId}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    console.log(productId, ':productId')

    const handleYes = async(e) => {
        e.preventDefault();
        dispatch(ProductActions.removeProduct(productId));
        closeModal();
    };

    const handleNo = () => {
        closeModal()
    };


    return (
        <div className="overlay">
            <div className="delete-product-modal">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to delete this product?</h4>
                <button className="yes-button" onClick={handleYes}>Yes</button>
                <button className="no-button" onClick={handleNo}>No</button>
            </div>
        </div>


    )
}


export default DeleteProductModal;
