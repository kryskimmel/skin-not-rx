import { useDispatch } from "react-redux";
import { removeCollection } from "../../../../redux/collection";
import { useModal } from "../../../../context/Modal";
import { Icon } from '@iconify/react';
import "./DeleteCollectionModal.css";

function DeleteCollectionModal ({collectionId, collectionName}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleYes = async (e) => {
        e.preventDefault();
        console.log(collectionId, 'collection.id')
        await dispatch(removeCollection(collectionId));
        if (window.location.href.includes('/users/current/favorites')) {
            window.location.reload();
        }
        closeModal();
    };

    const handleNo = () => {
        closeModal()
    };


    return (
        <div className="delete-collection-modal-wrapper">
        <div className="delete-collection-modal-div">
            <Icon icon="ph:warning-duotone" color="red" width="50" height="50" />
            <h1 className="delete-collection-modal-heading">Confirm Delete</h1>
            <h4 className="delete-collection-modal-subheading">Are you sure you want to delete: <span style={{color:"#000435"}}>{collectionName}</span>?</h4>
            <div className="delete-collection-modal-buttons">
                <button className="yes-button" onClick={handleYes}>Yes</button>
                <button className="no-button" onClick={handleNo}>No</button>
            </div>
        </div>
    </div>
    )
}

export default DeleteCollectionModal;
