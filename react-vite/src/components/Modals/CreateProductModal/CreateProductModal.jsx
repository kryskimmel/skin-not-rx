import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../redux/product';
import { useModal } from '../../../context/Modal';
import { Icon } from '@iconify/react';
import charCountRemaining from '../../../utils/charCountRemaining';
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
    const [keyIngredients, setKeyIngredients] = useState("");
    const [productLink, setProductLink] = useState("");
    // state for images
    const [previewImg, setPreviewImg] = useState("");
    const [frontendErrors, setFrontendErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submittedForm, setSubmittedForm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const validationErrors = {};


    // Toggle submit button classname
    const submitButtonCN = isDisabled ? "disabled-submit-button" : "enabled-submit-button"

    // Required fields to be filled in by user
    const requiredFields = brandName && productName && productType && description && previewImg

    // useEffect to that will set IsDisabled status to true if required fields are not empty
    useEffect(() => {
        if (!requiredFields) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
    });

    const imgFormats = [
        ".jpg",
        ".png",
        "jpeg",
    ];
    // useEffect to track validation errors
    useEffect(() => {
        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const maxChar300 = "Input must not exceed 300 characters."
        const maxChar500 = "Input must not exceed 500 characters."
        const minChar3 = "Input must be at least 3 characters long."
        const imgFormatError = "Image must be in one of the following formats: .jpg, .jpeg or .png";


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

        if (!previewImg) validationErrors.previewImg = inputRequired;
        else if (previewImg.length < 3) validationErrors.previewImg = minChar3;
        else if (!imgFormats.includes(previewImg.slice(-4))) validationErrors.previewImg = imgFormatError;

        setFrontendErrors(validationErrors);
    }, [brandName, productName, productType, description, keyIngredients, productLink, previewImg])


    console.log('frontenderrors', frontendErrors)
    console.log('show errors?', showErrors)
    console.log(Object.values(frontendErrors).length)
    console.log('form submitted?', submittedForm)
    console.log('backend errors?', backendErrors)



    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmittedForm(true)
        setShowErrors(Object.values(frontendErrors).length > 0);

        if (!imgFormats.includes(previewImg.slice(-4))) {
            validationErrors.previewImg = "Image must be in one of the following formats: .jpg, .jpeg or .png"
        } else {
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

        }


    };







    return (
        <div className='create-product-container'>
            <Icon icon="icon-park-solid:lotion" width="50" height="50" style={{ marginTop: "10px" }} />
            <h1>Create A Product</h1>
            <form className='create-product-form' onSubmit={handleSubmit}>
                <div className='product-form-div'>
                    <div className='product-form-left'>
                        <div className='brand-name-div'>
                            <label>Brand Name:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                            <input
                                type="text"
                                value={brandName}
                                onChange={(e) => { setBrandName((e.target.value).trimStart()) }}
                            />
                            {showErrors && submittedForm && frontendErrors?.brandName && <p className="errors-text">{frontendErrors.brandName}</p>}
                        </div>

                        <div className='product-name-div'>
                            <label>Product Name:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => { setProductName((e.target.value).trimStart()) }}
                            />
                            {showErrors && submittedForm && frontendErrors?.productName && <p className="errors-text">{frontendErrors.productName}</p>}
                            {submittedForm && backendErrors?.product_name && <p className="errors-text">{backendErrors.product_name}</p>}
                        </div>

                        <div className='product-type-div'>
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

                        <div className='description-div'>
                            <label>Description: <span style={{ color: '#8B0000', fontWeight: '600' }}> *</span></label>
                            <textarea
                                ref={descriptionRef}
                                value={description}
                                onChange={(e) => { setDescription((e.target.value).trimStart()) }}
                            ></textarea>
                            <p className='description-char-count'>({charCountRemaining(description, 500, descriptionRef)} characters remaining)</p>
                            {showErrors && submittedForm && frontendErrors?.description && <p className="errors-text">{frontendErrors.description}</p>}
                        </div>
                    </div>


                    <div className='product-form-right'>
                        <div className='key-ingredients-div'>
                            <label>Key Ingredients: </label>
                            <input
                                type="text"
                                value={keyIngredients}
                                onChange={(e) => { setKeyIngredients((e.target.value).trimStart()) }}
                            />
                            {showErrors && submittedForm && frontendErrors?.keyIngredients && <p className="errors-text">{frontendErrors.keyIngredients}</p>}
                        </div>

                        <div className='product-link-div'>
                            <label>Product Link: </label>
                            <input
                                type="text"
                                value={productLink}
                                onChange={(e) => { setProductLink((e.target.value).trimStart()) }}
                            />
                            {showErrors && submittedForm && frontendErrors?.productLink && <p className="errors-text">{frontendErrors.productLink}</p>}
                        </div>
                        <div className='preview-img-div'>
                            <label>Preview Image:<span style={{ color: '#8B0000', fontWeight: '600' }}> * </span></label>
                            <input
                                type='text'
                                value={previewImg}
                                onChange={(e) => { setPreviewImg((e.target.value).trimStart()) }}
                            />
                            {showErrors && submittedForm && frontendErrors?.previewImg && <p className="errors-text">{frontendErrors.previewImg}</p>}
                        </div>
                    </div>
                </div>
                <div className='create-product-button-div'>
                    <button type='submit' className={submitButtonCN} disabled={isDisabled}>Create</button>
                </div>
            </form>

        </div>
    )
}
export default CreateProductModal;
