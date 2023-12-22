// import { useModal } from '../../../context/Modal';
import "./CreateCollectionModal.css";

function CreateCollectionModal() {
    // const { closeModal } = useModal();
    return (
        <>
        <div className='create-collection-container'>
            <form>
                <h1>Create A Collection</h1>
                <label>Collection Name</label>
                <input type="text"/>
            </form>
        </div>
        </>
    )
}

export default CreateCollectionModal;
