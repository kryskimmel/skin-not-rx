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
                        <option value="Cleansers">Cleanser</option>
                        <option value="Exfoliators">Exfoliator</option>
                        <option value="Treatments">Treatment</option>
                        <option value="Serums">Serum</option>
                        <option value="Sunscreens">Sunscreen</option>
                        <option value="Moisturizers">Moisturizer</option>
                        <option value="Toners">Toner</option>
                        <option value="Face Masks">Face Mask</option>
                        <option value="Eye Serums">Eye Serum</option>
                        <option value="Eye Creams">Eye Cream</option>
                        <option value="Lip Repair And Protectants">Lip Repair & Protectant</option>
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
