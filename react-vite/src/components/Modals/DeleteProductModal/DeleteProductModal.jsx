import { useDispatch } from "react-redux";
import * as ProductActions from "../../../redux/product";
import { useModal } from "../../../context/Modal";
import "./DeleteProductModal.css";


function DeleteProductModal({brandName, productName, productId}) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    console.log(productId, ':productId')

    const handleYes = async (e) => {
        e.preventDefault();
        console.log(productId, ':productId')
        await dispatch(ProductActions.removeProduct(productId));
        closeModal();
        await dispatch(ProductActions.viewCurrUserProducts());
    };

    const handleNo = () => {
        closeModal()
    };


    return (
        <div className="overlay">
            <div className="delete-product-modal">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to delete <span style={{fontStyle:'italic',fontWeight:'600'}}>{brandName} {productName}</span>?</h4>
                <button className="yes-button" onClick={handleYes}>Yes</button>
                <button className="no-button" onClick={handleNo}>No</button>
            </div>
        </div>


    )
}


export default DeleteProductModal;
