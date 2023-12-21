import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import * as productActions from "../../../redux/product";
import { Icon } from '@iconify/react';
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
    const [skinConcern, setSkinConcern] = useState([]);
    const [productLink, setProductLink] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    console.log('session user:--', sessionUser)
    console.log('Product type selected:--', productType)
    console.log('USER INPUT:----->', {
        brandName: brandName,
        productName: productName,
        productType: productType,
        description: description,
        keyIngredients: keyIngredients,
        skinConcern: skinConcern,
        productLink: productLink,
        notes: notes

    })
    console.log('is the submit button disabled?', isDisabled)


    const handleSkinConcern = (e) => {
        const {value, checked} = e.target
        if (checked) {
            setSkinConcern(prev => [...prev, value])
        }
        else {
            setSkinConcern(prev => {return [...prev.filter(concern => concern !== value)]})
        }
    };
    console.log("skin concerns:--", skinConcern)


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
        if (!description) validationErrors.description = inputRequired;
        if (description && description.startsWith(" ")) validationErrors.description = cannotStartWithSpaces;
        if (description && description.length > 500) validationErrors.description = maxChar500;
        //Key Ingredients
        if (keyIngredients && keyIngredients.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        if (keyIngredients && keyIngredients.length < 3) validationErrors.keyIngredients = minChar3;
        if (keyIngredients && keyIngredients.length > 500) validationErrors.keyIngredients = maxChar500;
        //Skin Concern
        if (!skinConcern) validationErrors.skinConcern = inputRequired;
        if (skinConcern && skinConcern.length > 500) validationErrors.skinConcern = maxChar300;
        //Product Link
        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = cannotStartWithSpaces;
        if (productLink && productLink.length < 3) validationErrors.productLink = minChar3;
        if (productLink && productLink.length > 500) validationErrors.productLink = maxChar500;
        //Notes
        if (notes && notes.startsWith(" ")) validationErrors.notes = cannotStartWithSpaces;
        if (notes && notes.length < 3) validationErrors.notes = minChar3;
        if (notes && notes.length > 500) validationErrors.notes = maxChar500;

        setErrors(validationErrors);
        if (brandName.length && productName.length && productType.length && description.length && skinConcern.length) {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
    }, [brandName, productName, productType, description, keyIngredients, skinConcern, productLink, notes]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(true)
        if (Object.values(errors).length > 0) {
            setIsDisabled(true)
        }
        const newProduct = {
          brandName: brandName,
          productName: productName,
          productType: productType,
          description: description,
          keyIngredients: keyIngredients,
          skinConcern: skinConcern,
          productLink: productLink,
          notes: notes
        };
        dispatch(productActions.createProduct(newProduct))
          .then(async (newProduct) => {
            history.push(`/products/${newProduct.id}`);
          })
          .catch(async (res) => {
            if (res instanceof Response) {
              const data = await res.json();
              if (data.errors) {
                return setErrors(validationErrors);
              }
            }
          });
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
                    <select value={productType} onChange={(e) => {setProductType(e.target.value)}}>
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

                <div className='skin-concern-div'>
                    <label>Skin Concern: </label>
                    <div>
                        <input type="checkbox" name="dryness" value="Dryness" onChange={handleSkinConcern} /> Dryness
                        <input type="checkbox" name="dullness" value="Dullness" onChange={handleSkinConcern} /> Dullness
                        <input type="checkbox" name="uneven-texture" value="Uneven texture" onChange={handleSkinConcern} /> Uneven texture
                        <input type="checkbox" name="acne"  value="Acne" onChange={handleSkinConcern} /> Acne
                        <input type="checkbox" name="aging" value="Aging" onChange={handleSkinConcern} /> Aging
                        <input type="checkbox" name="redness"  value="Redness" onChange={handleSkinConcern} /> Redness
                        <input type="checkbox" name="large-pores" value="Large pores" onChange={handleSkinConcern} /> Large pores
                        <input type="checkbox" name="dark-circles" value="Dark circles" onChange={handleSkinConcern} /> Dark circles
                        <input type="checkbox" name="dark-spots"  value="Dark spots" onChange={handleSkinConcern} /> Dark spots
                    </div>
                    <div className='skincare-selection-div'>
                        {skinConcern?.map((concern) => (
                            <button
                                key={concern}
                                className='skinconcern-buttons'
                                disabled='true'
                                value={concern}>
                                    {concern}
                            </button>
                        ))}
                    </div>
                    {showErrors && errors?.skinConcern && <p className="errors-text">{errors.skinConcern}</p>}
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

                <div className='notes-div'>
                    <label>Notes: </label>
                    <textarea
                        value={notes}
                        onChange={(e) => {setNotes(e.target.value)}}
                        placeholder='What did you think about the product?'
                    ></textarea>
                    {showErrors && errors?.notes && <p className="errors-text">{errors.notes}</p>}
                </div>
                <button type='submit' disabled={isDisabled}>Create</button>
            </form>
        </div>
        </>
    )
}
export default CreateProductModal;
