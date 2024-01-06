import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../redux/product";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProductModal from "../DeleteProductModal";
import { Icon } from '@iconify/react';
import "./ProductInfoModal.css";


function ProductInfoModal( {productId}) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.byId[productId])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        console.log('the product id', productId)
        dispatch(productActions.viewProductDetails(productId)).then(() => {setIsLoaded(true)})
    }, [productId])


    return isLoaded && (
        <div className="product-info-modal-wrapper">
            <div className="product-info-image-div">
               <img src={product?.preview_image} alt={product?.product_name} className="product-info-image" width={175} height={175} />
            </div>
            <div className="product-info-information-div">
                <ul className="product-info-information-ul">
                    <li><span style={{fontWeight:"600"}}>BRAND NAME: </span> {product?.brand_name}</li>
                    <li><span style={{fontWeight:"600"}}>NAME: </span> {product?.product_name}</li>
                    <li><span style={{fontWeight:"600"}}>TYPE: </span> {product?.product_type}</li>
                    <li><span style={{fontWeight:"600"}}>DESCRIPTION: </span> {product?.description}</li>
                    <li><span style={{fontWeight:"600"}}>KEY INGREDIENTS: </span> {product?.key_ingredients}</li>
                    <li><span style={{fontWeight:"600"}}>SKIN CONCERN: </span> {product?.skin_concern}</li>
                    <li><span style={{fontWeight:"600"}}>PRODUCT LINK: </span><a href={product?.product_link} target="_blank" rel='noreferrer'><Icon icon="uil:link" width="20" height="20" /></a></li>
                </ul>
            </div>
            <div className="product-info-tools-div">
                <OpenModalButton
                    title={'Close'}
                    buttonText={<Icon icon="ph:x-square-bold" width="30" height="30" />}
                />
                <div className="product-info-mgmt-tools-div">
                    <OpenModalButton
                        title={'Edit'}
                        buttonText={<Icon icon="bxs:edit" width="30" height="30"/>}
                    />
                    <OpenModalButton
                        title={'Delete'}
                        buttonText={<Icon icon="ph:trash-bold" width="30" height="30" />}
                        modalComponent={<DeleteProductModal
                            brandName={product.brand_name}
                            productName={product.product_name}
                            productId={product.id}
                        />}
                    />
                </div>
            </div>
        </div>
    )
}


export default ProductInfoModal;
