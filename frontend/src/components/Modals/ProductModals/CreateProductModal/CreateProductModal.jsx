import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../../redux/product';
import { useModal } from '../../../../context/Modal';
import { Icon } from "@iconify/react";
import charCountRemaining from '../../../../utils/charCountRemaining';
import "./CreateProductModal.css";

function CreateProductModal() {
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
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
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
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
        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const maxChar500 = "Input must not exceed 500 characters."
        const minChar3 = "Input must be at least 3 characters long."

        if (!brandName) validationErrors.brandName = inputRequired;
        else if (brandName.startsWith(" ")) validationErrors.brandName = cannotStartWithSpaces;
        else if (brandName && brandName.length > 60) validationErrors.brandName = maxChar60;

        if (!productName) validationErrors.productName = inputRequired;
        else if (productName.startsWith(" ")) validationErrors.productName = cannotStartWithSpaces;
        else if (productName.length > 60) validationErrors.productName = maxChar60;

        if (!productType) validationErrors.productType = inputRequired;
        else if (productType.length > 60) validationErrors.productType = maxChar60;

        if (!description.length) validationErrors.description = inputRequired;
        else if (description.startsWith(" ")) validationErrors.description = cannotStartWithSpaces;
        else if (description.length > 500) validationErrors.description = maxChar500;

        if (keyIngredient1 && keyIngredient1.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        else if (keyIngredient1 && keyIngredient1.length < 3) validationErrors.keyIngredients = minChar3;
        else if (keyIngredient1 && keyIngredient1.length > 500) validationErrors.keyIngredients = maxChar500;

        if (keyIngredient2 && keyIngredient2.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        else if (keyIngredient2 && keyIngredient2.length < 3) validationErrors.keyIngredients = minChar3;
        else if (keyIngredient2 && keyIngredient2.length > 500) validationErrors.keyIngredients = maxChar500;

        if (keyIngredient3 && keyIngredient3.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        else if (keyIngredient3 && keyIngredient3.length < 3) validationErrors.keyIngredients = minChar3;
        else if (keyIngredient3 && keyIngredient3.length > 500) validationErrors.keyIngredients = maxChar500;

        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = cannotStartWithSpaces;
        else if (productLink && productLink.length < 3) validationErrors.productLink = minChar3;
        else if (productLink && productLink.length > 500) validationErrors.productLink = maxChar500;

        if (!previewImage) validationErrors.previewImage = inputRequired;
       
        setFrontendErrors(validationErrors);
        setKeyIngredients(keyIngredientsArr.join(','));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandName, productName, productType, description, keyIngredient1, keyIngredient2, keyIngredient3, productLink, previewImage])


    console.log('frontenderrors', frontendErrors)
    console.log('show errors?', showErrors)
    console.log(Object.values(frontendErrors).length)
    console.log('form submitted?', submittedForm)
    console.log('backend errors?', backendErrors)
    console.log('key ingredients--', keyIngredientsArr)
    console.log('key ingredients state -->', keyIngredients)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmittedForm(true);
    
        if (Object.keys(frontendErrors).length === 0) {
            const keyIngredientsString = keyIngredientsArr.join(', ');
    
            const formData = new FormData();
            formData.append('brand_name', brandName.trim());
            formData.append('product_name', productName.trim());
            formData.append('product_type', productType);
            formData.append('description', description.trim());
            formData.append('key_ingredients', keyIngredientsString);
            formData.append('product_link', productLink.trim());
            formData.append('user_id', user.id);
            formData.append('image_url', previewImageURL);
    
            const data = dispatch(addProduct(formData));
            if (Array.isArray(data)) {
                const dataErrors = {};
                data.forEach(error => {
                    const [key, value] = error.split(':');
                    dataErrors[key.trim()] = value.trim();
                });
                setBackendErrors(dataErrors);
            } else {
                closeModal();
            }
        }
    };


    return (
        <div className='create-product-container'>
            <h1 className='create-product-heading-div'>Create A Product</h1>
            <div className="signup-form-close-modal-div" onClick={()=> closeModal()}>
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
                        {showErrors && submittedForm && frontendErrors?.brandName && (
                            <div className="errors-div">
                                <p className="errors-text">{frontendErrors.brandName}</p>
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
                    {showErrors && submittedForm && frontendErrors?.productName && (
                        <div className="errors-div">
                            <p className="errors-text">{frontendErrors.productName}</p>
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
                    {showErrors && submittedForm && frontendErrors?.productType && (
                        <div className="errors-div">
                            <p className="errors-text">{frontendErrors.productType}</p>
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
                    {showErrors && submittedForm && frontendErrors?.description && (
                        <div className="errors-div">
                            <p className="errors-text">{frontendErrors.description}</p>
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
                    {showErrors && submittedForm && frontendErrors?.keyIngredients && (
                        <div className="errors-div">
                            <p className="errors-text">{frontendErrors.keyIngredients}</p>
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
                    {showErrors && submittedForm && frontendErrors?.productLink && (
                        <div className="errors-div">
                            <p className="errors-text">{frontendErrors.productLink}</p>
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
                    {showErrors && submittedForm && frontendErrors?.previewImage && (
                        <div className="errors-div">
                            <p className="errors-text">{frontendErrors.previewImage}</p>
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