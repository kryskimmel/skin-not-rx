import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useModal } from "../../../../context/Modal";
import { Icon } from '@iconify/react';
import { editProduct } from "../../../../redux/product";
import charCountRemaining from '../../../../utils/charCountRemaining';
import "./UpdateProductModal.css";


function UpdateProductModal({ productId, product }) {
    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);
    const [brandName, setBrandName] = useState(product.brand_name);
    const [productName, setProductName] = useState(product.product_name);
    const [productType, setProductType] = useState(product.product_type);
    const [description, setDescription] = useState(product.description);
    const [keyIngredientsArr, setKeyIngredientsArr] = useState([]);
    const prevKeyIngredients = product.key_ingredients?.split(",")
    const [keyIngredient1, setKeyIngredient1] = useState(prevKeyIngredients?.[0]);
    const [keyIngredient2, setKeyIngredient2] = useState(prevKeyIngredients?.[1]);
    const [keyIngredient3, setKeyIngredient3] = useState(prevKeyIngredients?.[2]);
    const [keyIngredients, setKeyIngredients] = useState("");
    const [productLink, setProductLink] = useState(product.product_link);
    const [previewImg, setPreviewImg] = useState(product.preview_image);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const submitButtonCN = isDisabled ? "disabled-submit-button" : "enabled-submit-button";
    const requiredFields = brandName && productName && productType && description
    const validationErrors = {};

    console.log('the product?', product)

    useEffect(() => {
        if (product) {
            setBrandName(product.brand_name || "")
            setProductName(product.product_name || "")
            setProductType(product.product_type || "")
            setDescription(product.description || "")
            setKeyIngredients(product.key_ingredients || "")
            setProductLink(product.product_link || "")
            setPreviewImg(product.preview_image || "")
        }
    }, [])


    useEffect(() => {
        if (!requiredFields) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    });

    useEffect(() => {
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

        if (keyIngredients && keyIngredients.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        else if (keyIngredients && keyIngredients.length < 3) validationErrors.keyIngredients = minChar3;
        else if (keyIngredients && keyIngredients.length > 500) validationErrors.keyIngredients = maxChar500;

        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = cannotStartWithSpaces;
        else if (productLink && productLink.length < 3) validationErrors.productLink = minChar3;
        else if (productLink && productLink.length > 500) validationErrors.productLink = maxChar500;

        setFrontendErrors(validationErrors);
    }, [brandName, productName, productType, description, keyIngredients, productLink])

    useEffect(() => {
        setShowErrors(Object.values(frontendErrors).length > 0);
    }, [frontendErrors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmittedForm(true);

        const updatedProduct = {
            "brand_name": brandName.trimEnd(),
            "product_name": productName.trimEnd(),
            "product_type": productType,
            "description": description.trimEnd(),
            "key_ingredients": keyIngredients.trimEnd(),
            "product_link": productLink.trimEnd(),
            "user_id": user.id,
            "image_url": previewImg
        };

        try {
            const data = await dispatch(editProduct({productId, updatedProductData:updatedProduct}));

            if (Array.isArray(data)) {
                const dataErrors = {};
                data?.forEach(error => {
                    const [key, value] = error.split(':');
                    dataErrors[key.trim()] = value.trim();
                });
                setBackendErrors(dataErrors);
            } else {
                if (Object.values(frontendErrors).length === 0) {
                    if (window.location.href.includes('/users/current/favorites')) {
                        window.location.reload();
                    }
                    closeModal();
                }
            }
        } catch (error) {
            throw new Error(`There was an error in submitting your form for creating a new product: ${error}`);
        }
    };


    return (
        <div className='update-product-container'>
            <h1 className="update-product-heading-div">Update Product</h1>
            <div className="product-form-close-modal-div" onClick={()=> closeModal()}>
                <Icon 
                    icon="material-symbols-light:close" 
                    width="25" 
                    height="25" 
                />
            </div>
            <form className='update-product-form' onSubmit={handleSubmit}>
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
                <div className='create-product-button-div'>
                    <button type='submit' className={submitButtonCN} disabled={isDisabled}>Update</button>
                </div>
            </form>

        </div>
    )
}

export default UpdateProductModal;