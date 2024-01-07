import { useState, useEffect } from 'react';
// import { createProduct } from '../../../redux/product';

function CreateProductFormPage () {
    const [brandName, setBrandName] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [description, setDescription] = useState("");
    const [keyIngredients, setKeyIngredients] = useState("");
    const [productLink, setProductLink] = useState("");
    const [errors, setErrors] = useState({});
    // const [backendErrors, setBackendErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // const dispatch = useDispatch();



    // Toggle submit button classname
    const submitButtonCN = Object.values(errors).length > 0 ? "disabled-submit-button" : "enabled-submit-button"

    // useEffect for validation errors
    useEffect(() => {
        const validationErrors = {}
        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const maxChar300 = "Input must not exceed 300 characters."
        const maxChar500 = "Input must not exceed 500 characters."
        const minChar3 = "Input must be at least 3 characters long."

        //Brand Name
        if (!brandName) validationErrors.brandName = inputRequired;
        if (brandName && brandName.startsWith(" ")) validationErrors.brandName = cannotStartWithSpaces;
        if (brandName && brandName.length > 60) validationErrors.brandName = maxChar60;
        //Product Name
        if (!productName) validationErrors.productName = inputRequired;
        if (productName && productName.startsWith(" ")) validationErrors.productName = cannotStartWithSpaces;
        if (productName && productName.length > 60) validationErrors.productName = maxChar60;
        //Product Type
        if (!productType) validationErrors.productType = inputRequired;
        if (productType && productType.length > 60) validationErrors.productType = maxChar60;
        //Description
        if (!description.length) validationErrors.description = inputRequired;
        if (description && description.startsWith(" ")) validationErrors.description = cannotStartWithSpaces;
        if (description && description.length > 500) validationErrors.description = maxChar500;
        //Key Ingredients
        if (keyIngredients && keyIngredients.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        if (keyIngredients && keyIngredients.length < 3) validationErrors.keyIngredients = minChar3;
        if (keyIngredients && keyIngredients.length > 500) validationErrors.keyIngredients = maxChar500;
        //Product Link
        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = cannotStartWithSpaces;
        if (productLink && productLink.length < 3) validationErrors.productLink = minChar3;
        if (productLink && productLink.length > 500) validationErrors.productLink = maxChar500;

        setErrors(validationErrors);

        const hasValidationErrors = Object.values(validationErrors).some((error) => error);
        const hasEmptyRequiredFields = !brandName || !productName || !productType || !description

        setIsDisabled(hasValidationErrors || hasEmptyRequiredFields);

    }, [brandName, productName, productType, description, keyIngredients, productLink]);

    useEffect(() => {
        if (showErrors && Object.values(errors).length > 0) setIsDisabled(true)
        else setIsDisabled(false)
    }, [errors, showErrors])



    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setShowErrors(true)
        // if (showErrors && Object.values(errors).length > 0) {
        //     setIsDisabled(true)
        // }
        setShowErrors(true)
        setIsDisabled(false)

    // const newProduct = {
    //     brandName: brandName,
    //     productName: productName,
    //     productType: productType,
    //     description: description,
    //     keyIngredients: keyIngredients,
    //     productLink: productLink,
    //     notes: notes,
    //     user_id: user.id
    // };

    // if (showErrors && !Object.keys(errors).length) {
        // const data =  await dispatch(createProduct(newProduct));


        // if (data) {
        //     const dataErrors = {};
        //     data?.forEach(error => {
        //     const [key, value] = error.split(':')
        //     dataErrors[key.trim()] = value.trim()
        //     });
        //     setBackendErrors(dataErrors);
        // }
        // else {
        //     closeModal();
        // }
    // }



        // dispatch(productActions.createProduct(newProduct))
        //   .then(async (newProduct) => {
        //     history.push(`/products/${newProduct.id}`);
        //   })
        //   .catch(async (res) => {
        //     if (res instanceof Response) {
        //       const data = await res.json();
        //       if (data.errors) {
        //         return setErrors(validationErrors);
        //       }
        //     }
        //   });
      };

    return (
        <>
        <div className='create-product-container'>
            <form onSubmit={handleSubmit}>
                <h1>Add A Product</h1>
                <div className='brand-name-div'>
                    <label>Brand Name: </label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => {setBrandName(e.target.value)}}
                        required
                    />
                    {showErrors && errors?.brandName && <p className="errors-text">{errors.brandName}</p>}
                </div>

                <div className='product-name-div'>
                    <label>Product Name: </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => {setProductName(e.target.value)}}
                        required
                    />
                    {showErrors && errors?.productName && <p className="errors-text">{errors.productName}</p>}
                </div>

                <div className='product-type-div'>
                    <label>Product Type: </label>
                    <select className='product-type-select' value={productType} onChange={(e) => {setProductType(e.target.value)}}>
                        <option value="" disabled>--</option>
                        <option value="cleansers">Cleanser</option>
                        <option value="exfoliators">Exfoliator</option>
                        <option value="treatments">Treatment</option>
                        <option value="serums">Serum</option>
                        <option value="sunscreens">Sunscreen</option>
                        <option value="moisturizers">Moisturizer</option>
                        <option value="toners">Toner</option>
                        <option value="faceMasks">Face Mask</option>
                        <option value="eyeSerums">Eye Serum</option>
                        <option value="eyeCreams">Eye Cream</option>
                        <option value="lipRepairAndProtectants">Lip Repair & Protectant</option>
                    </select>
                    {showErrors && errors?.productType && <p className="errors-text">{errors.productType}</p>}
                </div>

                <div className='description-div'>
                    <label>Description: </label>
                    <textarea
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                        required
                    ></textarea>
                    {showErrors && errors?.description && <p className="errors-text">{errors.description}</p>}
                </div>

                <div className='key-ingredients-div'>
                    <label>Key Ingredients: </label>
                    <input
                        type="text"
                        value={keyIngredients}
                        onChange={(e) => {setKeyIngredients(e.target.value)}}
                    />
                    {showErrors && errors?.keyIngredients && <p className="errors-text">{errors.keyIngredients}</p>}
                </div>

                <div className='product-link-div'>
                    <label>Product Link: </label>
                    <input
                        type="text"
                        value={productLink}
                        onChange={(e) => {setProductLink(e.target.value)}}
                    />
                    {showErrors && errors?.productLink && <p className="errors-text">{errors.productLink}</p>}
                </div>
                <div className='create-product-button-div'>
                    <button type='submit' className={submitButtonCN} disabled={isDisabled}>Create</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default CreateProductFormPage;
