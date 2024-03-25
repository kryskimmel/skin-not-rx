/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection, getCurrUserCollections } from "../../../../redux/collection";
import { useModal } from "../../../../context/Modal";
import SearchBarAndAddProduct from "../SearchBarAndAddProduct";
import formErrorsObj from "../../../../utils/formErrorsObj";
import { Icon } from "@iconify/react";
import "./CreateCollectionModal.css";

function CreateCollectionModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentUserId = useSelector(state => state.session.user.id);
    const allProducts = useSelector(state => state.products.allProducts);
    const [name, setName] = useState('');
    const [addProducts, setAddProducts] = useState(null);
    const [errors, setErrors] = useState({});
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


    useEffect(() => {
        if (name && productIdsToAdd.length > 0) setIsDisabled(false);
        else setIsDisabled(true);
    }, [name, productIdsToAdd.length])

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
    }, [dispatch, name]);

    const handleNameChange = (e) => {
        setName((e.target.value).trimStart());
        setBackendErrors({ ...backendErrors, name: null });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmittedForm(true)
        if (Object.values(errors).length > 0) {
            e.preventDefault();
            setShowErrors(true);
            setSubmittedForm(true);
        } else {
            const newCollection = {
                'name': name.trimEnd(),
                'user_id': currentUserId,
                'product_ids': productIdsToAdd
            }
            const res = await dispatch(addCollection(newCollection));
            if (res.error) {
                setSubmittedForm(true);
                setShowErrors(true);
                if (res.error.message) {
                    setBackendErrors(formErrorsObj(res.error.message));
                } else {
                    setBackendErrors({});
                }
            } else {
                setShowErrors(false);
                setBackendErrors({});
                setErrors({});
                await dispatch(getCurrUserCollections());
                closeModal();
            }
        }
    }
    return (
        <div className='create-collection-container'>
            {allProducts.message ? (
            <>
                <div className="login-form-close-modal-div" onClick={()=> closeModal()}>
                    <Icon 
                        icon="material-symbols-light:close" 
                        width="25" 
                        height="25" 
                    />
                </div>
                <div className="no-prod-create-coll-div">
                    <p className="no-prod-create-coll-text">{allProducts.message}</p>
                    <p className="no-prod-create-coll-text">Please create a product before creating a collection.</p>
                </div>
            </>
            ) : (
                <>
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
                        onChange={handleNameChange}
                    />
                    {showErrors && submittedForm && errors?.name && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.name}</p>
                        </div>
                    )}  
                    <SearchBarAndAddProduct setAddProducts={setAddProducts}/>
                    <div className="collection-submit-button-div">
                        <button type="submit" className={submitButtonCN} disabled={isDisabled}>Create Collection</button>
                    </div>
                </form>
                </>
            )}
        </div>
    )
}

export default CreateCollectionModal;