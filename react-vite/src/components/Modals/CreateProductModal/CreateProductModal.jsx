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

        if (!brandName) validationErrors.brandName = inputRequired;
        if (brandName && brandName.startsWith(" ")) validationErrors.brandName = cannotStartWithSpaces;
        if (brandName && brandName.length > 60) validationErrors.brandName = maxChar60;

        if (!productName) validationErrors.productName = inputRequired;
        if (productName && productName.startsWith(" ")) validationErrors.productName = cannotStartWithSpaces;
        if (productName && productName.length > 60) validationErrors.productName = maxChar60;

        if (!productType) validationErrors.productType = inputRequired;
        if (productType && productType.startsWith(" ")) validationErrors.productType = cannotStartWithSpaces;
        if (productType && productType.length > 60) validationErrors.productType = maxChar60;

        if (!description) validationErrors.description = inputRequired;
        if (description && description.startsWith(" ")) validationErrors.description = cannotStartWithSpaces;
        if (description && description.length > 500) validationErrors.description = maxChar500;

        // if (!keyIngredients) validationErrors.keyIngredients = inputRequired;
        if (keyIngredients && keyIngredients.startsWith(" ")) validationErrors.keyIngredients = cannotStartWithSpaces;
        if (keyIngredients && keyIngredients.length < 3) validationErrors.keyIngredients = minChar3;
        if (keyIngredients && keyIngredients.length > 500) validationErrors.keyIngredients = maxChar500;

        if (!skinConcern) validationErrors.skinConcern = inputRequired;
        // if (skinConcern && skinConcern.startsWith(" ")) validationErrors.skinConcern = cannotStartWithSpaces;
        // if (skinConcern && skinConcern.length > 500) validationErrors.skinConcern = maxChar300;

        // if (!productLink) validationErrors.productLink = inputRequired;
        if (productLink && productLink.startsWith(" ")) validationErrors.productLink = cannotStartWithSpaces;
        if (productLink && productLink.length < 3) validationErrors.productLink = minChar3;
        if (productLink && productLink.length > 500) validationErrors.productLink = maxChar500;

        // if (!notes) validationErrors.notes = inputRequired;
        if (notes && notes.startsWith(" ")) validationErrors.notes = cannotStartWithSpaces;
        if (notes && notes.length < 3) validationErrors.notes = minChar3;
        if (notes && notes.length > 500) validationErrors.notes = maxChar500;

        setErrors(validationErrors);
    }, [brandName, productName, productType, description, keyIngredients, skinConcern, productLink, notes]);

    useEffect(() => {
        if (brandName && productName && productType && description && keyIngredients && skinConcern && productLink && notes) {
            setIsDisabled(false)
        }

    }, [brandName, productName, productType, description, keyIngredients, skinConcern, productLink, notes, errors])

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
                <label>Brand Name</label>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => {setBrandName(e.target.value)}}
                    required
                />
                {showErrors && errors?.brandName && <p className="errors-text">{errors.brandName}</p>}

                <label>Product Name</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => {setProductName(e.target.value)}}
                    required
                />
                {showErrors && errors?.productName && <p className="errors-text">{errors.productName}</p>}

                <label>Product Type</label>
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

                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    required
                />
                {showErrors && errors?.description && <p className="errors-text">{errors.description}</p>}

                <label>Key Ingredients</label>
                <input
                    type="text"
                    value={keyIngredients}
                    onChange={(e) => {setKeyIngredients(e.target.value)}}
                    required
                />
                {showErrors && errors?.keyIngredients && <p className="errors-text">{errors.keyIngredients}</p>}

                <label>Skin Concern</label>
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
                            value={concern}><Icon icon="ph:x-light" /> {concern}</button>
                    ))}
                </div>




                {showErrors && errors?.skinConcern && <p className="errors-text">{errors.skinConcern}</p>}

                <label>Product Link</label>
                <input
                    type="text"
                    value={productLink}
                    onChange={(e) => {setProductLink(e.target.value)}}
                    required
                />
                {showErrors && errors?.productLink && <p className="errors-text">{errors.productLink}</p>}

                <label>Notes</label>
                <input
                    type="text"
                    value={notes}
                    onChange={(e) => {setNotes(e.target.value)}}
                    required
                />
                {showErrors && errors?.notes && <p className="errors-text">{errors.notes}</p>}
                <button type='submit' disabled={isDisabled}>Create</button>
            </form>
        </div>
        </>
    )
}
export default CreateProductModal;
