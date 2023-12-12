import "./ProductRandomizer.css";

function ProductRandomizer() {
    return (
        <div className="product-randomizer-container">
            <form>
                <label>Looking for a new product to add to your routine?</label>
                <select name="product-randomizer">
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
                <button className="generate-button">Generate</button>
            </form>
        </div>
    )
}

export default ProductRandomizer;
