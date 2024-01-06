import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as ProductActions from "../../../redux/product";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import ProductInfoModal from "../../Modals/ProductInfoModal";
import "./UserProducts.css";


function UserProducts() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userProducts = useSelector(state => state.product.allProducts);

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
            </div>
        </div>
    )

}

export default UserProducts;
