import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as ProductActions from "../../../redux/product";
import OpenModalButton from "../../../utils/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductModals/ProductInfoModal";
import CreateProductModal from "../../Modals/ProductModals/CreateProductModal";
import { Icon } from '@iconify/react';
import "./UserProducts.css";


function UserProducts() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.product.allProducts);
    console.log('USER PRODS', userProducts)

    useEffect(() => {
        dispatch(ProductActions.viewCurrUserProducts())
    }, [dispatch])


    return (
        <div className="products-container">
            <h1 className="products-title">My Products</h1>
            <div className="products-wrapper">
                <div className="custom-product">
                    <OpenModalButton
                        buttonText={
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <p>Create A Product</p>
                                <Icon icon="basil:add-outline" width="30" height="30" />
                            </div>}
                        modalComponent={<CreateProductModal />}
                    />
                </div>
                {userProducts
                    ? userProducts.map((attr) => (
                        <div key={attr.id}>
                            <OpenModalButton
                                className="product-tile-button"
                                buttonText={
                                    <div className="product-tile">
                                        <div className="product-tile-img">
                                            <img src={attr.preview_image} style={{width:'175px', height:'175px', padding:'10px'}} />
                                        </div>
                                        <div>
                                            <ul className="product-tile-info-ul">
                                                <li style={{ fontWeight: "600" }}>{attr.brand_name}</li>
                                                <li>{attr.product_name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                                modalComponent={<ProductInfoModal productId={attr.id} />}
                            />
                        </div>
                    ))
                    : <h2 className="no-products-text">You have not created any products!</h2>}

            </div>
        </div>
    )

}

export default UserProducts;
