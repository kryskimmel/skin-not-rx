import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createCollection } from "../../../../redux/collection";
import { useModal } from "../../../../context/Modal";
import SearchBarAndAddProduct from "../../../../utils/SearchBarAndAddProduct";
import "./CreateCollectionModal.css";

function CreateCollectionModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [productsToAdd, setProductsToAdd] = useState('');
    const [frontendErrors, setFrontendErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const validationErrors = {};

    console.log('products to add in create', productsToAdd)
    // to collect the data from the SearchBarAndAddProduct component
    const handleProductsToAdd = (data) => {
        setProductsToAdd(data)
    }

    // grab product ids from the selected products to add
    const productIds = [];
    if (productsToAdd) {
        productsToAdd.map((attr) => { productIds.push(attr.id) })
    }

    const submitButtonCN = isDisabled ? "disabled-collection-submit-button" : "enabled-collection-submit-button"

    useEffect(() => {
        if (name && productIds.length > 0) setIsDisabled(false);
        else setIsDisabled(true);
    }, [name, productIds.length])


    // useEffect to keep track of validation errors
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
    }, [dispatch, name, productsToAdd]);

    useEffect(() => {
        setShowErrors(Object.values(frontendErrors).length > 0);
    }, [frontendErrors]);


    // console.log('the validation errors', validationErrors)
    // console.log('the validation errors inside ERRORS state', frontendErrors)
    // console.log('show errors?', showErrors)
    // console.log(Object.values(frontendErrors).length)
    // console.log('form submitted?', submittedForm)
    // console.log('backend errors?', backendErrors)

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmittedForm(true)

        const newCollection = {
            'name': name.trimEnd(),
            'user_id': currentUserId,
            'product_ids': productIds
        }
        try {
            const data = await dispatch(createCollection(newCollection));
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
            <form className='create-collection-form' onSubmit={handleSubmit}>
                <label>Collection Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName((e.target.value).trimStart()) }}
                />
                {showErrors && submittedForm && frontendErrors?.name && <p className="errors-text">{frontendErrors.name}</p>}
                <SearchBarAndAddProduct productsToAdd={handleProductsToAdd} />
                <div className="collection-submit-button-div">
                    <button type="submit" className={submitButtonCN} disabled={isDisabled}>Create Collection</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCollectionModal;
