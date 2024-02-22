import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../../redux/product';
import { useModal } from '../../../../context/Modal';
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
    const [productLink, setProductLink] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const keyIngredientsArr = [];
    const submitButtonCN = isDisabled ? "disabled-product-submit-button" : "enabled-product-submit-button";

    // required fields to be filled in by user
    const requiredFields = 
    brandName && 
    productName && 
    productType && 
    description && 
    previewImg


    useEffect(() => {
        if (!requiredFields) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    }, [dispatch, requiredFields]);


    // function to add individual key ingredrient to key ingredients array
    const addToKeyIngredients = () => {
        if (keyIngredient1) keyIngredientsArr.push(keyIngredient1);
        if (keyIngredient2) keyIngredientsArr.push(keyIngredient2);
        if (keyIngredient3) keyIngredientsArr.push(keyIngredient3);
    };
    addToKeyIngredients();


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
       
        setFrontendErrors(validationErrors);
        setKeyIngredients(keyIngredientsArr.join(','));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandName, productName, productType, description, keyIngredient1, keyIngredient2, keyIngredient3, productLink, previewImg])


    console.log('frontenderrors', frontendErrors)
    console.log('show errors?', showErrors)
    console.log(Object.values(frontendErrors).length)
    console.log('form submitted?', submittedForm)
    console.log('backend errors?', backendErrors)
    console.log('key ingredients--', keyIngredientsArr)
    console.log('key ingredients state -->', keyIngredients)



    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmittedForm(true)
        setShowErrors(Object.values(frontendErrors).length > 0);


        const newProduct = {
            "brand_name": brandName.trimEnd(),
            "product_name": productName.trimEnd(),
            "product_type": productType,
            "description": description.trimEnd(),
            "key_ingredients": keyIngredients.trimEnd(),
            "product_link": productLink.trimEnd(),
            "user_id": user.id,
            "image_url": previewImg.trimEnd()
        }


        const data = await dispatch(createProduct(newProduct))
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
    };


    return (
        <div className='create-product-container'>
            <h1>Create A Product</h1>
            <form className='create-product-form' onSubmit={handleSubmit}>
                <div className='create-product-fields'>
                    <div className='f-brandname'>
                        <label>Brand Name:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                        <input
                            type="text"
                            value={brandName}
                            onChange={(e) => { setBrandName((e.target.value).trimStart()) }}
                        />
                        {showErrors && submittedForm && frontendErrors?.brandName && <p className="errors-text">{frontendErrors.brandName}</p>}
                    </div>
                </div>
                <div className='f-productname'>
                    <label>Product Name:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => { setProductName((e.target.value).trimStart()) }}
                    />
                    {showErrors && submittedForm && frontendErrors?.productName && <p className="errors-text">{frontendErrors.productName}</p>}
                    {submittedForm && backendErrors?.product_name && <p className="errors-text">{backendErrors.product_name}</p>}
                </div>
                <div className='f-producttype'>
                    <label>Product Type:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                    <select className='product-type-select' value={productType} onChange={(e) => { setProductType(e.target.value) }}>
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
                    {showErrors && submittedForm && frontendErrors?.productType && <p className="errors-text">{frontendErrors.productType}</p>}
                </div>
                <div className='f-description'>
                    <label>Description: <span style={{ color: '#8B0000', fontWeight: '600' }}> *</span></label>
                    <textarea
                        ref={descriptionRef}
                        value={description}
                        onChange={(e) => { setDescription((e.target.value).trimStart()) }}
                    ></textarea>
                    <p className='f-description-char-count'>({charCountRemaining(description, 500, descriptionRef)} characters remaining)</p>
                    {showErrors && submittedForm && frontendErrors?.description && <p className="errors-text">{frontendErrors.description}</p>}
                </div>
                <div className='f-keyingredients'>
                    <label>Key Ingredients: </label>
                    <input
                        type="text"
                        placeholder='Key Ingredient #1'
                        value={keyIngredient1}
                        onChange={(e) => { setKeyIngredient1((e.target.value).trimStart()) }}
                    />
                    <input
                        type="text"
                        placeholder='Key Ingredient #2'
                        value={keyIngredient2}
                        onChange={(e) => { setKeyIngredient2((e.target.value).trimStart()) }}
                    />
                    <input
                        type="text"
                        placeholder='Key Ingredient #3'
                        value={keyIngredient3}
                        onChange={(e) => { setKeyIngredient3((e.target.value).trimStart()) }}
                    />
                    {showErrors && submittedForm && frontendErrors?.keyIngredients && <p className="errors-text">{frontendErrors.keyIngredients}</p>}
                </div>
                <div className='f-productlink'>
                    <label>Product Link: </label>
                    <input
                        type="text"
                        value={productLink}
                        onChange={(e) => { setProductLink((e.target.value).trimStart()) }}
                    />
                    {showErrors && submittedForm && frontendErrors?.productLink && <p className="errors-text">{frontendErrors.productLink}</p>}
                </div>
                <div className='f-previewimg'>
                    <label>Preview Image:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                    <input
                        type='file'
                        accept='.jpeg, .jpg, .png, .webp'
                        value={previewImg} 
                    />
                    {showErrors && submittedForm && frontendErrors?.previewImg && <p className="errors-text">{frontendErrors.previewImg}</p>}
                </div>
                <div className='create-product-button'>
                    <button type='submit' className={submitButtonCN} disabled={isDisabled}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProductModal;