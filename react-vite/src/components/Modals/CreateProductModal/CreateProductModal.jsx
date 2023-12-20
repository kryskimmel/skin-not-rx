import { useModal } from '../../../context/Modal';
import "./createProductModal.css";

function CreateProductModal () {
    const { closeModal } = useModal();
    return (
        <>
        <div className='create-product-container'>
            <form>
                <h1>Add A Product</h1>
                <label>Brand Name</label>
                <input type="text"/>

                <label>Product Name</label>
                <input type="text"/>

                <label>Product Type</label>
                <input type="text"/>

                <label>Description</label>
                <input type="text"/>

                <label>Key Ingredients</label>
                <input type="text"/>

                <label>Skin Concern</label>
                <input type="text"/>

                <label>Product Link</label>
                <input type="text"/>
            </form>
        </div>
        </>
    )
}
export default CreateProductModal;
