import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SearchBar from "../../Products/SearchBar/SearchBar";
import "./CreateCollectionModal.css";

function CreateCollectionModal() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);
    const currentUserId = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [productId, setProductId] = useState([]);
    const [userId, setUserId] = useState(currentUserId);
    const [productsToAdd, setProductsToAdd] = useState('');
    const [errors, setErrors] = useState({});

    const handleProductsToAdd = (data) => {
        console.log('PRODUCT TO ADD:-->', data);
        setProductsToAdd(data)
    }


    // useEffect to keep track of validation errors
    useEffect(() => {
        const validationErrors = {};
        const inputRequired = "Input is required."
        const cannotStartWithSpaces = "Input cannot begin with a space."
        const maxChar60 = "Input must not exceed 60 characters."
        const minChar3 = "Input must be at least 3 characters long."

        if (!name) validationErrors.name = inputRequired;
        if (name && name.startsWith(" ")) validationErrors.name = cannotStartWithSpaces;
        if (name && name.length > 60) validationErrors.name = maxChar60;
        if (name && name.length < 3) validationErrors.name = minChar3;

        setErrors(validationErrors);
    }, [dispatch, name, productId, productsToAdd]);


    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const newCollection = {
            'name': name,
            'user_id': userId,
            'product_id': productsToAdd
        }
        console.log('NEW', newCollection)
    }



    return (
        <>
        <div className='create-collection-container'>
            <form onSubmit={handleSubmit}>
                <h1>Create A Collection</h1>
                <label>Collection Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <SearchBar productsToAdd={handleProductsToAdd}/>
                <button type="submit" className="create-collection-button">Create Collection</button>
            </form>
        </div>
        </>
    )
}

export default CreateCollectionModal;
