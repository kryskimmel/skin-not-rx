/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../../../redux/collection";
import { useModal } from "../../../../context/Modal";
import SearchBarAndAddProduct from "../SearchBarAndAddProduct";
import { Icon } from "@iconify/react";
import "./CreateCollectionModal.css";

function CreateCollectionModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [addProducts, setAddProducts] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const submitButtonCN = isDisabled ? "disabled-collection-submit-button" : "enabled-collection-submit-button";

  
    const productIdsToAdd = useMemo(() => {
        const ids = [];
        if (addProducts) {
            addProducts.map((prod) => ids.push(prod.id));
        }
        return ids
    }, [addProducts]);

  
    const removeProduct = (prodId) => {
        setAddProducts(addProducts.filter((prod) => prod.id !== prodId));
    };

    useEffect(() => {
        if (name && productIdsToAdd.length > 0) setIsDisabled(false);
        else setIsDisabled(true);
    }, [name, productIdsToAdd.length])

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
    }, [dispatch, name]);

    useEffect(() => {
        setShowErrors(Object.values(frontendErrors).length > 0);
    }, [frontendErrors]);


    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmittedForm(true)

        const newCollection = {
            'name': name.trimEnd(),
            'user_id': currentUserId,
            'product_ids': productIdsToAdd
        }
        try {
            const data = dispatch(addCollection(newCollection));
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
        <div className='create-collection-container'>
            <h1 className='create-collection-h1'>Create A Collection</h1>
            <div className="login-form-close-modal-div" onClick={()=> closeModal()}>
                <Icon 
                    icon="material-symbols-light:close" 
                    width="25" 
                    height="25" 
                />
            </div>
            <form className='create-collection-form' onSubmit={handleSubmit}>
                <label>Collection Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName((e.target.value).trimStart()) }}
                />
                {showErrors && submittedForm && frontendErrors?.name && <p className="errors-text">{frontendErrors.name}</p>}
                <SearchBarAndAddProduct setAddProducts={setAddProducts}/>
                <div className="collection-submit-button-div">
                    <button type="submit" className={submitButtonCN} disabled={isDisabled}>Create Collection</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCollectionModal;