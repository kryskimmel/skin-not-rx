import { useSelector } from "react-redux";
import "./CreateCollectionModal.css";

function CreateCollectionModal() {
    const allProducts = useSelector(state => state.product.allProducts)

    return (
        <>
        <div className='create-collection-container'>
            <form>
                <h1>Create A Collection</h1>
                <label>Collection Name:</label>
                <input type="text"/>
                <label>Add Products:</label>
                <select>
                    {allProducts.map(product => <option key={product.id}>{product.brand_name.toUpperCase()} {product.product_name}</option>)}
                </select>
                <button className="create-collection-button">Create Collection</button>
            </form>
        </div>
        </>
    )
}

export default CreateCollectionModal;
