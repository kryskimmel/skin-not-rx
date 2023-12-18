import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import randomInt from "../../../utils/randomIntGenerator";
import { useModal } from '../../../context/Modal';
import { Icon } from '@iconify/react';
import "./RandomProductModal.css";


function RandomProductModal ({selected, isGenerateClicked}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const productsByType = useSelector(state => state.product.byProductType);
    const [randomProduct, setRandomProduct] = useState("");
    const [onHoverStar, setOnHoverStar] = useState(false)
    const [onHoverRefresh, setOnHoverRefresh] = useState(false)
    const [onHoverExit, setOnHoverExit] = useState(false)


    useEffect(() => {
        dispatch(productActions.getAllProducts())
    }, [dispatch]);


    useEffect(() => {
        if (isGenerateClicked) {
            setRandomProduct(productsByType[selected]?.[randomInt(productsByType[selected])]);
        }
    }, [isGenerateClicked, selected, productsByType]);

    const handleRefreshIconClick = () => {
        setRandomProduct(productsByType[selected]?.[randomInt(productsByType[selected])]);
    }

    return (
        <>
            <div className="random-product-tile">
                <ul style={{listStyle: "none"}}>
                    <li className="random-product-img"><a href={randomProduct?.product_link} target="_blank"><img src={randomProduct?.preview_image} alt={randomProduct?.product_name} title={randomProduct?.product_name}/></a></li>
                    <li><span style={{fontWeight:"600"}}>BRAND NAME:</span> {randomProduct?.brand_name}</li>
                    <li><span style={{fontWeight:"600"}}>NAME:</span> {randomProduct?.product_name}</li>
                    <li><span style={{fontWeight:"600"}}>TYPE:</span> {randomProduct?.product_type}</li>
                    <li><span style={{fontWeight:"600"}}>DESCRIPTION:</span> {randomProduct?.description}</li>
                    <li><span style={{fontWeight:"600"}}>KEY INGREDIENTS:</span> {randomProduct?.key_ingredients}</li>
                    <li><span style={{fontWeight:"600"}}>SKIN CONCERN:</span> {randomProduct?.skin_concern}</li>
                    <div className="random-product-tile-buttons">
                        <li
                            onMouseOver={()=> setOnHoverStar(true)}
                            onMouseOut={() => setOnHoverStar(false)}
                            onClick={() => alert('...Feature coming soon')}>
                            {!onHoverStar ? <Icon icon="clarity:favorite-line" width="30" height="30"/> : <Icon className="favorite-star-icon" icon="clarity:favorite-solid" color="#f4c430" width="30" height="30" />}
                        </li>
                        <li
                            onMouseOver={()=> setOnHoverRefresh(true)}
                            onMouseOut={() => setOnHoverRefresh(false)}
                            onClick={handleRefreshIconClick}>
                            {!onHoverRefresh ? <Icon className="refresh-icon" icon="tabler:refresh" color="#000000" width="30" height="30"/> : <Icon className="refresh-icon" icon="tabler:refresh" color="#50C878" width="30" height="30"/>}
                        </li>
                        <li
                            onMouseOver={()=> setOnHoverExit(true)}
                            onMouseOut={() => setOnHoverExit(false)}
                            onClick={()=> {closeModal()}}>
                            {!onHoverExit ? <Icon className="close-icon" icon="octicon:x-12" color="#000000" width="30" height="30"/> : <Icon className="close-icon" icon="octicon:x-12" color="#B90E0A" width="30" height="30"/>}
                        </li>
                    </div>
                </ul>
            </div>
        </>
    )
};

export default RandomProductModal;
