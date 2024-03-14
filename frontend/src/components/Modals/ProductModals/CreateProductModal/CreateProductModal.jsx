import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../../redux/product';
import { useModal } from '../../../../context/Modal';
import { Icon } from '@iconify/react';
import charCountRemaining from '../../../../utils/charCountRemaining';
import formErrorsObj from '../../../../utils/formErrorsObj';
import "./CreateProductModal.css";

function CreateProductModal() {
    const [brandName, setBrandName] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [description, setDescription] = useState("");
    const [keyIngredient1, setKeyIngredient1] = useState("");
    const [keyIngredient2, setKeyIngredient2] = useState("");
    const [keyIngredient3, setKeyIngredient3] = useState("");
    const [keyIngredients, setKeyIngredients] = useState("");
    const [keyIngredientsArr, setKeyIngredientsArr] = useState([]);
    const [productLink, setProductLink] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [previewImageURL, setPreviewImageURL] = useState("");
    const [showPreviewImage, setShowPreviewImage] = useState(false);
    const [errors, setErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const submitButtonCN = isDisabled ? "disabled-product-submit-button" : "enabled-product-submit-button";

    // required fields to be filled in by user
    const requiredFields = 
    brandName && 
    productName && 
    productType && 
    description && 
    previewImage


    useEffect(() => {
        if (!requiredFields) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    }, [dispatch, requiredFields]);


    const addToKeyIngredients = () => {
        const ingredients = [];
        if (keyIngredient1) ingredients.push(keyIngredient1);
        if (keyIngredient2) ingredients.push(keyIngredient2);
        if (keyIngredient3) ingredients.push(keyIngredient3);
        setKeyIngredientsArr(ingredients);
    };
 

    useEffect(() => {
        addToKeyIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyIngredient1, keyIngredient2, keyIngredient3]);


    // function to prepare image for sending to AWS S3
    const addImage = async (e) => { 
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
            setPreviewImage(reader.result);
            }
            setPreviewImageURL(file);
            setShowPreviewImage(true);
        } else {
            setPreviewImageURL(null);
            setShowPreviewImage(false);
            setPreviewImage(null);
        }
    };


    // useEffect to track validation errors
    useEffect(() => {
        const validationErrors = {};
        const inputRequiredError = "Input is required";
        const beginningSpacesError = "Input cannot begin with a space";
        const charMax60Error = "Input must not exceed 60 characters";
        const charMax500Error = "Input must not exceed 500 characters";
        const charMin2Error = "Input must be at least 2 characters long";
        const charMin4Error = "Input must be at least 4 characters long";

        if (!brandName) validationErrors.brandName = inputRequiredError;
        else if (brandName.startsWith(" ")) validationErrors.brandName = beginningSpacesError;
        else if (brandName.length > 60) validationErrors.brandName = charMax60Error;
        else if (brandName.length < 2) validationErrors.brandName = charMin2Error;

        if (!productName) validationErrors.productName = inputRequiredError;
        else if (productName.startsWith(" ")) validationErrors.productName = beginningSpacesError;
        else if (productName.length > 60) validationErrors.productName = charMax60Error;
        else if (productName.length < 2) validationErrors.productName = charMin2Error;

        if (!productType) validationErrors.productType = inputRequiredError;

        if (!description.length) validationErrors.description = inputRequiredError;
        else if (description.startsWith(" ")) validationErrors.description = beginningSpacesError;
        else if (description.length > 500) validationErrors.description = charMax500Error;
        else if (description.length < 4) validationErrors.description = charMin4Error;

        if (keyIngredient1 && keyIngredient1.startsWith(" ")) validationErrors.keyIngredients = beginningSpacesError;
        else if (keyIngredient1 && keyIngredient1.length < 2) validationErrors.keyIngredients = charMin2Error;
        else if (keyIngredient1 && keyIngredient1.length > 500) validationErrors.keyIngredients = charMax500Error;

        if (keyIngredient2 && keyIngredient2.startsWith(" ")) validationErrors.keyIngredients = beginningSpacesError;
        else if (keyIngredient2 && keyIngredient2.length < 2) validationErrors.keyIngredients = charMin2Error;
        else if (keyIngredient2 && keyIngredient2.length > 500) validationErrors.keyIngredients = charMax500Error;

        if (keyIngredient3 && keyIngredient3.startsWith(" ")) validationErrors.keyIngredients = beginningSpacesError;
        else if (keyIngredient3 && keyIngredient3.length < 2) validationErrors.keyIngredients = charMin2Error;
        else if (keyIngredient3 && keyIngredient3.length > 500) validationErrors.keyIngredients = charMax500Error;

        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = beginningSpacesError;
        else if (productLink && productLink.length < 4) validationErrors.productLink = charMin4Error;
        else if (productLink && productLink.length > 500) validationErrors.productLink = charMax500Error;

        if (!previewImage) validationErrors.previewImage = inputRequiredError;
       
        setErrors(validationErrors);
        setKeyIngredients(keyIngredientsArr.join(','));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandName, productName, productType, description, keyIngredient1, keyIngredient2, keyIngredient3, productLink, previewImage])


    console.log('frontenderrors', errors)
    console.log('show errors?', showErrors)
    console.log(Object.values(errors).length)
    console.log('form submitted?', submittedForm)
    console.log('backend errors?', backendErrors)
    console.log('key ingredients--', keyIngredientsArr)
    console.log('key ingredients state -->', keyIngredients)
    console.log('any frontend errors-->', errors)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const keyIngredientsString = keyIngredientsArr.join(',');

        const formData = new FormData();
        formData.append('brand_name', brandName.trim());
        formData.append('product_name', productName.trim());
        formData.append('product_type', productType);
        formData.append('description', description.trim());
        formData.append('key_ingredients', keyIngredientsString.trim());
        formData.append('product_link', productLink.trim());
        formData.append('user_id', user.id);
        formData.append('image_url', previewImageURL);

        const res = await dispatch(addProduct(formData));
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
            closeModal();
        }
    };


    return (
        <div className='create-product-container'>
            <h1 className='create-product-heading-div'>Create A Product</h1>
            <div className="product-form-close-modal-div" onClick={()=> closeModal()}>
                <Icon 
                    icon="material-symbols-light:close" 
                    width="25" 
                    height="25" 
                />
            </div>
            <form className='create-product-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='create-product-fields'>
                    <div className='f-brandname'>
                        <label>Brand Name<span style={{color: "#8B0000"}}>*</span></label>
                        <input
                            required
                            className='product-input'
                            type="text"
                            value={brandName}
                            onChange={(e) => { setBrandName((e.target.value).trimStart()) }}
                        />
                        {showErrors && submittedForm && errors?.brandName && (
                            <div className="errors-div">
                                <p className="errors-text">{errors.brandName}</p>
                            </div>
                        )}  
                    </div>
                </div>
                <div className='f-productname'>
                    <label>Product Name<span style={{color: "#8B0000"}}>*</span></label>
                    <input
                        required
                        className='product-input'
                        type="text"
                        value={productName}
                        onChange={(e) => { setProductName((e.target.value).trimStart()) }}
                    />
                    {showErrors && submittedForm && errors?.productName && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.productName}</p>
                        </div>
                    )}  
                    {submittedForm && backendErrors?.product_name && (
                        <div>
                            <p className="errors-text">{backendErrors.product_name}</p>
                        </div>
                    )}
                </div>
                <div className='f-producttype'>
                    <label>Product Type<span style={{color: "#8B0000"}}>*</span></label>
                    <select 
                        required
                        className='product-input' 
                        value={productType} 
                        onChange={(e) => { setProductType(e.target.value) }}>
                        <option value="" disabled>--</option>
                        <option value="Cleanser">Cleanser</option>
                        <option value="Exfoliator">Exfoliator</option>
                        <option value="Treatment">Treatment</option>
                        <option value="Serum">Serum</option>
                        <option value="Sunscreen">Sunscreen</option>
                        <option value="Moisturizer">Moisturizer</option>
                        <option value="Toner">Toner</option>
                        <option value="Face Mask">Face Mask</option>
                        <option value="Eye Serum">Eye Serum</option>
                        <option value="Eye Cream">Eye Cream</option>
                        <option value="Lip Repair & Protectant">Lip Repair & Protectant</option>
                    </select>
                    {showErrors && submittedForm && errors?.productType && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.productType}</p>
                        </div>
                    )}  
                </div>
                <div className='f-description'>
                    <label>Description<span style={{color: "#8B0000"}}>*</span></label>
                    <textarea
                        required
                        className='product-textarea'
                        ref={descriptionRef}
                        value={description}
                        onChange={(e) => { setDescription((e.target.value).trimStart()) }}
                    ></textarea>
                    <p className='f-description-char-count'>({charCountRemaining(description, 500, descriptionRef)} characters remaining)</p>
                    {showErrors && submittedForm && errors?.description && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.description}</p>
                        </div>
                    )}  
                </div>
                <div className='f-keyingredients'>
                    <label>Key Ingredients</label>
                    <input
                        className='product-input'
                        type="text"
                        placeholder='Key Ingredient #1'
                        value={keyIngredient1}
                        onChange={(e) => { setKeyIngredient1((e.target.value).trimStart()) }}
                    />
                    <input
                        className='product-input'
                        type="text"
                        placeholder='Key Ingredient #2'
                        value={keyIngredient2}
                        onChange={(e) => { setKeyIngredient2((e.target.value).trimStart()) }}
                    />
                    <input
                        className='product-input'
                        type="text"
                        placeholder='Key Ingredient #3'
                        value={keyIngredient3}
                        onChange={(e) => { setKeyIngredient3((e.target.value).trimStart()) }}
                    />
                    {showErrors && submittedForm && errors?.keyIngredients && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.keyIngredients}</p>
                        </div>
                    )}  
                </div>
                <div className='f-productlink'>
                    <label>Product Link</label>
                    <input
                        className='product-input'
                        type="text"
                        value={productLink}
                        onChange={(e) => { setProductLink((e.target.value).trimStart()) }}
                    />
                    {showErrors && submittedForm && errors?.productLink && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.productLink}</p>
                        </div>
                    )}  
                </div>
                <div className='f-previewimg'>
                    <label htmlFor='product-file-upload'>Preview Image<span style={{color: "#8B0000"}}>*</span></label>
                    <input
                        required
                        type='file'
                        id='product-file-upload'
                        name='image_url'
                        accept='.jpeg, .jpg, .png, .webp'
                        onChange={addImage}
                        style={{marginTop:"2px", cursor:"pointer"}}
                    />
                    {showErrors && submittedForm && errors?.previewImage && (
                        <div className="errors-div">
                            <p className="errors-text">{errors.previewImage}</p>
                        </div>
                    )}  
                </div>
                <div className="selected-preview-img-div">
                    {showPreviewImage ? (
                        <img
                        src={previewImage}
                        alt="product preview image"
                        className='preview-img'
                        /> ): null
                    }
                </div>
                <div className='create-product-button'>
                    <button type='submit' className={submitButtonCN} disabled={isDisabled}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProductModal;