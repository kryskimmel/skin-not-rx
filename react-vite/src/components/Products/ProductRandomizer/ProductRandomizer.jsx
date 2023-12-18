import { useState } from "react";
import RandomProductModal from "../../Modals/RandomProductModal/RandomProductModal";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import "./ProductRandomizer.css";

function ProductRandomizer() {
    const [selected, setSelected] = useState("");
    const [isGenerateClicked, setIsGenerateClicked] = useState(true);

    const handleSelect = (e) => {
        setSelected(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsGenerateClicked(true);
    };

    return (
        <div className="product-randomizer-container">
            <form onSubmit={handleSubmit}>
                <h2>Looking for a new product to add to your routine?</h2>
                <div className="randomizer-form-components">
                    <p>Select a product type to get a randomly generated product!</p>
                    <select name="product-randomizer" value={selected} onChange={handleSelect}>
                        <option value="" disabled>--Select a product type--</option>
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
                </div>
                <OpenModalButton
                    buttonText="Generate"
                    modalComponent={<RandomProductModal selected={selected} isGenerateClicked={isGenerateClicked}/>}
                />
            </form>
        </div>
    )
}


export default ProductRandomizer;
