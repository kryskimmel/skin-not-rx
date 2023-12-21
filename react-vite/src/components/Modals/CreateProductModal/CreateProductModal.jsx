import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import "./createProductModal.css";

function CreateProductModal () {
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [brandName, setBrandName] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [description, setDescription] = useState("");
    const [keyIngredients, setKeyIngredients] = useState("");
    const [skinConcern, setSkinConcern] = useState("");
    const [productLink, setProductLink] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    console.log('session user:--', sessionUser)

    useEffect(() => {
        const validationErrors = {}

        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const maxChar300 = "Input must not exceed 300 characters."
        const maxChar500 = "Input must not exceed 500 characters."
        const minChar3 = "Input must be at least 3 characters long."

        if (!brandName) validationErrors.brandName = inputRequired;
        if (brandName && brandName.startsWith(" ")) validationErrors.brandName = cannotStartWithSpaces;
        if (brandName && brandName.length > 60) validationErrors.brandName = maxChar60;

        if (!productName) validationErrors.productName = inputRequired;
        if (productName && productName.startsWith(" ")) validationErrors.productName = cannotStartWithSpaces;
        if (productName && productName.length > 60) validationErrors.productName = maxChar60;

        if (!productType) validationErrors.productType = inputRequired;
        if (productType && productType.startsWith(" ")) validationErrors.productType = cannotStartWithSpaces;
        if (productType && productType.length > 60) validationErrors.productType = maxChar60;

        if (!description) validationErrors.description = inputRequired;
        if (description && description.startsWith(" ")) validationErrors.description = cannotStartWithSpaces;
        if (description && description.length > 500) validationErrors.description = maxChar500;

        // if (!keyIngredients) validationErrors.keyIngredients = inputRequired;
        if (keyIngredients && keyIngredients.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        if (keyIngredients && keyIngredients.length < 3) validationErrors.keyIngredients = minChar3;
        if (keyIngredients && keyIngredients.length > 500) validationErrors.keyIngredients = maxChar500;

        if (!skinConcern) validationErrors.skinConcern = inputRequired;
        if (skinConcern && skinConcern.startsWith(" ")) validationErrors.skinConcern = cannotStartWithSpaces;
        if (skinConcern && skinConcern.length > 500) validationErrors.skinConcern = maxChar300;

        // if (!productLink) validationErrors.productLink = inputRequired;
        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = cannotStartWithSpaces;
        if (productLink && productLink.length < 3) validationErrors.productLink = minChar3;
        if (productLink && productLink.length > 500) validationErrors.productLink = maxChar500;

        // if (!notes) validationErrors.notes = inputRequired;
        if (notes && notes.startsWith(" ")) validationErrors.notes = cannotStartWithSpaces;
        if (notes && notes.length < 3) validationErrors.notes = minChar3;
        if (notes && notes.length > 500) validationErrors.notes = maxChar500;

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [brandName, productName, productType, description, keyIngredients, skinConcern, productLink, notes]);

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

                <label>Notes</label>
                <input type="text"/>
            </form>
        </div>
        </>
    )
}
export default CreateProductModal;
