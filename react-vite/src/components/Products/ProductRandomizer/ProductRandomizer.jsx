import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../redux/product";
import "./ProductRandomizer.css";

function ProductRandomizer() {
    const [selected, setSelected] = useState("");
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);

    console.log(allProducts)
    console.log(selected)


    useEffect(() => {
        dispatch(productActions.getAllProducts())
    }, [dispatch])

    const handleSelect = (e) => {
        setSelected(e.target.value)
    }

    const handleSubmit = () => {
        if (selected) {
            filtered = allProducts.filter(product_type === selected)
            console.log('filtereddd', filtered)

        }
    }

    console.log(selected)

    return (
        <div className="product-randomizer-container">
            <form onSubmit={handleSubmit}>
                <label>Looking for a new product to add to your routine?</label>
                <select name="product-randomizer" onClick={handleSelect}>
                    <option value="cleanser">Cleanser</option>
                    <option value="exfoliator">Exfoliator</option>
                    <option value="treatment">Treatment</option>
                    <option value="serum">Serum</option>
                    <option value="sunscreen">Sunscreen</option>
                    <option value="moisturizer">Moisturizer</option>
                    <option value="toner">Toner</option>
                    <option value="face-mask">Face Mask</option>
                    <option value="eye-serum">Eye Serum</option>
                    <option value="eye-cream">Eye Cream</option>
                    <option value="lip-repair-protectant">Lip Repair & Protectant</option>
                </select>
                <button className="generate-button" onClick={()=>{console.log('selected value:', selected)}}>Generate</button>
            </form>
        </div>
    )
}

export default ProductRandomizer;
