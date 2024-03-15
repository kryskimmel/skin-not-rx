/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../../../context/Modal";
import { editCollection } from "../../../../redux/collection";
import SearchBarAndAddProduct from "../SearchBarAndAddProduct";
import formErrorsObj from "../../../../utils/formErrorsObj";
import { Icon } from '@iconify/react';
import "./UpdateCollectionModal.css";

function UpdateCollectionModal ({collectionId, collectionName, items}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const collectionToEdit = useSelector(state => state.collections.byId[collectionId])
    const [name, setName] = useState(collectionName);
    const [prevStoredProducts, setPrevStoredProducts] = useState(items);
    const [addProducts, setAddProducts] = useState([]);
    const [errors, setErrors] = useState({});
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
        const inputRequiredError = "Input is required";
        const beginningSpacesError = "Input cannot begin with a space";
        const charMax20Error = "Input must not exceed 20 characters";
        const charMin2Error = "Input must be at least 2 characters long";

        if (!name) validationErrors.name = inputRequiredError;
        else if (name.startsWith(" ")) validationErrors.name = beginningSpacesError;
        else if (name.length > 20) validationErrors.name = charMax20Error;
        else if (name.length < 2) validationErrors.name = charMin2Error;

        setErrors(validationErrors);
    }, [dispatch, name, prevStoredProducts, addProducts]);

    const handleNameChange = (e) => {
        setName((e.target.value).trimStart());
        setBackendErrors({ ...backendErrors, name: null });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(errors).length > 0) {
            e.preventDefault();
            setShowErrors(true);
            setSubmittedForm(true);
        } else {
            const prodIds = [...prevStoredProducts.map((prod) => prod.id), ...addProducts.map((prod) => prod.id)];
            const updatedCollection = {
                'name': name.trimEnd(),
                'user_id': currentUserId,
                'product_ids': prodIds
            }
            const res = await dispatch(editCollection({collectionId, updatedCollectionData:updatedCollection}));
            if (res.error) {
                setSubmittedForm(true);
                setShowErrors(true);
                if (res.error.message) {
                    setBackendErrors(formErrorsObj(res.error.message));
                } else {
                    setBackendErrors({});
                }
            } else {
                if (window.location.href.includes('/users/current/favorites')) {
                    window.location.reload();
                    closeModal();
                }  else {
                    setShowErrors(false);
                    setBackendErrors({});
                    setErrors({});
                    closeModal();
                }
            }
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
                    onChange={handleNameChange}
                />
                {showErrors && submittedForm && errors?.name && (
                    <div className="errors-div">
                        <p className="errors-text">{errors.name}</p>
                    </div>
                )}  
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