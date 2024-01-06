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
    const [errors, setErrors] = useState({});


    // To collect the data from the SearchBarAndAddProduct component
    const handleProductsToAdd = (data) => {
        setProductsToAdd(data)
    }

    // Grab product ids from the selected products to add
    const productIds = [];
    if (productsToAdd) {
        productsToAdd.map((attr) => {productIds.push(attr.productId)})
    }


    // useEffect to keep track of validation errors
    useEffect(() => {
        const validationErrors = {};
        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const minChar3 = "Input must be at least 3 characters long."

        if (!name) validationErrors.name = inputRequired;
        if (name && name.startsWith(" ")) validationErrors.name = cannotStartWithSpaces;
        if (name && name.length > 60) validationErrors.name = maxChar60;
        if (name && name.length < 3) validationErrors.name = minChar3;

        setErrors(validationErrors);
    }, [dispatch, name, productsToAdd]);


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
                <button type="submit" className="create-collection-button">Create Collection</button>
            </form>
        </div>
        </>
    )
}

export default CreateCollectionModal;
