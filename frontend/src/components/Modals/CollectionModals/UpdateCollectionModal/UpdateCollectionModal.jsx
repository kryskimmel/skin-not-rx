/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../../../context/Modal";
import { editCollection } from "../../../../redux/collection";
import SearchBarAndAddProduct from "../SearchBarAndAddProduct";
import { Icon } from '@iconify/react';
import "./UpdateCollectionModal.css";

function UpdateCollectionModal ({collectionId, collectionName, items}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const collectionToEdit = useSelector(state => state.collection.byId[collectionId])
    const [name, setName] = useState(collectionName);
    const [prevStoredProducts, setPrevStoredProducts] = useState(items);
    const [addProducts, setAddProducts] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const submitButtonCN = isDisabled ? "disabled-collection-update-button" : "enabled-collection-update-button"


    useEffect(() => {
        if (collectionToEdit) {
            setName(collectionToEdit.name || "")
            setPrevStoredProducts(collectionToEdit.Products)
        }
    }, [collectionToEdit]);

   
    useEffect(() => {
        if (name && (prevStoredProducts.length > 0 || addProducts.length > 0)) setIsDisabled(false);
        else setIsDisabled(true);
    }, [name, prevStoredProducts.length, addProducts.length]);


    useEffect(() => {
        const validationErrors = {};
        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const minChar3 = "Input must be at least 3 characters long."

        if (!name) validationErrors.name = inputRequired;
        else if (name.startsWith(" ")) validationErrors.name = cannotStartWithSpaces;
        else if (name.length > 60) validationErrors.name = maxChar60;
        else if (name.length < 3) validationErrors.name = minChar3;

        setFrontendErrors(validationErrors);
    }, [dispatch, name, prevStoredProducts, addProducts]);

    useEffect(() => {
        setShowErrors(Object.values(frontendErrors).length > 0);
    }, [frontendErrors]);


    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmittedForm(true)
        const prodIds = [...prevStoredProducts.map((prod) => prod.id), ...addProducts.map((prod) => prod.id)];
        const updatedCollection = {
            'name': name.trimEnd(),
            'user_id': currentUserId,
            'product_ids': prodIds
        }
        console.log('AFTER form submission', updatedCollection)
        try {
            const data = await dispatch(editCollection({collectionId, updatedCollectionData:updatedCollection}));
            if (Array.isArray(data)) {
				const dataErrors = {};
				data?.forEach(error => {
				const [key, value] = error.split(':')
				dataErrors[key.trim()] = value.trim()
				});
				setBackendErrors(dataErrors);
            } else {
                if (Object.values(frontendErrors).length === 0) {
                    closeModal();
                }
            }
        } catch (error) {
            throw new Error(`There was an error in submitting your form for creating a new collection: ${error}`)
        }
    };


    return (
        <>
        <div className='update-collection-container'>
            <h1 className="update-collection-h1">Update A Collection</h1>
            <div className="update-collection-close-modal-div" onClick={()=> closeModal()}>
                <Icon 
                    icon="material-symbols-light:close" 
                    width="25" 
                    height="25" 
                />
            </div>
            <form className='update-collection-form' onSubmit={handleSubmit}>
                <label>Collection Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName((e.target.value).trimStart())}
                />
                {showErrors && submittedForm && frontendErrors?.name && <p className="errors-text">{frontendErrors.name}</p>}
                <SearchBarAndAddProduct setAddProducts={setAddProducts} prevStoredProducts={prevStoredProducts} setPrevStoredProducts={setPrevStoredProducts}/>
                <div className="update-collection-button-div">
                    <button type="submit" className={submitButtonCN} disabled={isDisabled}>Update</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UpdateCollectionModal;