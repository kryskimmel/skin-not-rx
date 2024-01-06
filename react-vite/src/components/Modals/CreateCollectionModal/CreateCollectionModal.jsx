import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as collectionActions from "../../../redux/collection";
import { useModal } from "../../../context/Modal";
import SearchBarAndAddProduct from "../../SearchBar/SearchBarAndAddProduct/SearchBarAndAddProduct";
import "./CreateCollectionModal.css";

function CreateCollectionModal () {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [productsToAdd, setProductsToAdd] = useState('');
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const validationErrors = {};


    // To collect the data from the SearchBarAndAddProduct component
    const handleProductsToAdd = (data) => {
        setProductsToAdd(data)
    }

    // Grab product ids from the selected products to add
    const productIds = [];
    if (productsToAdd) {
        productsToAdd.map((attr) => {productIds.push(attr.productId)})
    }

    // Toggle submit button classname
    const submitButtonCN = isDisabled ? "disabled-submit-button" : "enabled-submit-button"

    // useEffect to that will set IsDisabled status to true if required fields are not empty
    useEffect(() => {
        if (name && productIds.length > 0) {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
    })

    console.log('BEFORE SUBMIT:--', {
        'name': name,
        'user_id': currentUserId,
        'product_ids': productIds
    })

    // useEffect to keep track of validation errors
    // useEffect(() => {
    //     const validationErrors = {};
    //     const inputRequired = "Input is required."
    //     const cannotStartWithSpaces = "Input cannot begin with a space."
    //     const maxChar60 = "Input must not exceed 60 characters."
    //     const minChar3 = "Input must be at least 3 characters long."

    //     if (!name) validationErrors.name = inputRequired;
    //     if (name && name.startsWith(" ")) validationErrors.name = cannotStartWithSpaces;
    //     if (name && name.length > 60) validationErrors.name = maxChar60;
    //     if (name && name.length < 3) validationErrors.name = minChar3;

    //     setErrors(validationErrors);
    // }, [dispatch, name, productsToAdd]);


    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newCollection = {
            'name': name,
            'user_id': currentUserId,
            'product_ids': productIds
        }
        await dispatch(collectionActions.createCollection(newCollection));
        await dispatch(collectionActions.viewCurrUserCollections());
        closeModal();
    }


    return (
        <>
        <div className='create-collection-container'>
            <form onSubmit={handleSubmit}>
                <h1>Create A Collection</h1>
                <label>Collection Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <SearchBarAndAddProduct productsToAdd={handleProductsToAdd}/>
                <button type="submit" className={submitButtonCN} disabled={isDisabled}>Create Collection</button>
            </form>
        </div>
        </>
    )
}

export default CreateCollectionModal;
