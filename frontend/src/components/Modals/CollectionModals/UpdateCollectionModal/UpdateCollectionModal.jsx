import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../../../context/Modal";
import { modifyCollection } from "../../../../redux/collection";
import SearchBarAndAddProduct from "../../../../utils/SearchBarAndAddProduct";
import { Icon } from '@iconify/react';
import "./UpdateCollectionModal.css";

function UpdateCollectionModal ({collectionId, collectionName, items}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const collectionToEdit = useSelector(state => state.collection.byId[collectionId])
    const [name, setName] = useState(collectionName);
    const [prevStoredProducts, setPrevStoredProducts] = useState(items);
    const [newProductsToAdd, setNewProductsToAdd] = useState([]);
    const [frontendErrors, setFrontendErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const validationErrors = {};


    useEffect(() => {
        if (collectionToEdit) {
            setName(collectionToEdit.name || "")
            setPrevStoredProducts(collectionToEdit.Products)
        }
    }, [collectionToEdit])

    console.log('Items:--', items)
    console.log("SELECTED COLLECTION TO EDIT:--", collectionToEdit)
    console.log("PREVIOUSLY STORED PRODUCTS:--", prevStoredProducts)

    // To collect the data from the SearchBarAndAddProduct component
    const handleProductsToAdd = (data) => {
        console.log('*********DATA*****', data)
        const noDuplicates = data.filter(product => !prevStoredProducts.some(existingProduct => existingProduct.id === product.id));

        setNewProductsToAdd(noDuplicates);
        setPrevStoredProducts([...noDuplicates, ...prevStoredProducts]);
        console.log({ noDuplicates, prevStoredProducts });
    }


    // Grab product ids from the previously stored products
    const prevStoredProductIds = [];
    if (prevStoredProducts) {
        console.log(true)
        prevStoredProducts.map((attr) => {prevStoredProductIds.push(attr.id)})
    }


    // Grab product ids from new products to add
    const productIdsToAdd = [];
    if (newProductsToAdd) {
        newProductsToAdd.map((attr) => {productIdsToAdd.push(attr.id)})
    }


    // Toggle submit button classname
    const submitButtonCN = isDisabled ? "disabled-collection-update-button" : "enabled-collection-update-button"


    // Function to remove a previously stored product from the collection
    const removeProduct = (productId) => {
        let newProductList = prevStoredProducts.filter(product => product.id !== productId);
        setPrevStoredProducts(newProductList);
        console.log('new list!!!',newProductList)
    }


    // useEffect to that will set IsDisabled status to true if required fields are not empty
    useEffect(() => {
        if (name && prevStoredProductIds.length > 0) {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
    }, [name, prevStoredProductIds.length])


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
    }, [dispatch, name, prevStoredProducts, newProductsToAdd]);

    useEffect(() => {
        setShowErrors(Object.values(frontendErrors).length > 0);
    }, [frontendErrors]);


    console.log('BEFORE form submission', {
        'name': name,
        'user_id': currentUserId,
        'product_ids': prevStoredProductIds
    })


    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmittedForm(true)
        const prodIds = prevStoredProducts.map((prod) => prod.id)
        const updatedCollection = {
            'name': name.trimEnd(),
            'user_id': currentUserId,
            'product_ids': prodIds
        }
        console.log('AFTER form submission', updatedCollection)
        try {
            const data = await dispatch(modifyCollection(collectionId, updatedCollection));
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
                <SearchBarAndAddProduct productsToAdd={handleProductsToAdd}/>
                <p style={{marginTop:'10px'}}>Products currently in colection:</p>
                <div className="previously-stored-products-div">
                    <ul className="previously-stored-products-ul">
                    {Array.isArray(prevStoredProducts) && prevStoredProducts.map((product) => (
                        <li className="previously-stored-products-item" key={product.id}>
                            {product.brand_name}: {product.product_name}
                            <p className="remove-prod" onClick={() => removeProduct(product.id)}>Remove</p>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="update-collection-button-div">
                    <button type="submit" className={submitButtonCN} disabled={isDisabled}>Update</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UpdateCollectionModal;