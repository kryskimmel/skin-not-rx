import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as ProductActions from "../../../redux/product";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductInfoModal";
import CreateProductModal from "../../Modals/CreateProductModal";
import { Icon } from '@iconify/react';
import "./UserProducts.css";


function UserProducts() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userProducts = useSelector(state => state.product.allProducts);
    console.log('USER PRODS', userProducts)

    useEffect(() => {
        dispatch(ProductActions.viewCurrUserProducts())
    }, [dispatch])


    return (
        <div className="user-profile-products-wrapper">
            <h1 className="user-profile-products-h1">My Products</h1>
            <div className="user-profile-products-div">
                {userProducts
                ? userProducts.map((attr) => (
                <div key={attr.id}>
                    <OpenModalButton
                        className="user-profile-products-buttons"
                        buttonText={
                            <div className="user-profile-products-tile">
                                <div className="user-profile-products-tile-img-div">
                                    <img src={attr.preview_image} className="user-profile-products-tile-img"/>
                                </div>
                                <div className="user-profile-products-tile-info">
                                    <ul className="user-profile-products-tile-ul">
                                        <li style={{fontWeight:"600"}}>{attr.brand_name}</li>
                                        <li>{attr.product_name}</li>
                                    </ul>
                                </div>
                            </div>
                        }
                        modalComponent={<ProductInfoModal productId={attr.id}/>}
                    />
                </div>
                ))
                : <h2>You have not created any products!</h2>}
                <div className="create-custom-product-div">
                        <OpenModalButton
                        buttonText={
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                <p>Create A Product</p>
                                <Icon icon="basil:add-outline" width="30" height="30" />
                            </div>}
                        modalComponent={<CreateProductModal/>}
                        />
                </div>
            </div>
        </div>
    )

}

export default UserProducts;
