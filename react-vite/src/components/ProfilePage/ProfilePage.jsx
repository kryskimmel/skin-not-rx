import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../redux/product";
import "./ProfilePage.css";

function ProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    const productsByType = useSelector(store => store.product.byProductType);

    useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);



    console.log('products selector', productsByType)

    return (
        <>
        <div className="profile-page-container">
            <h1 className="profile-page-h1">{user.username.toUpperCase()}'S PROFILE</h1>
            <div className="profile-page-collections-div">
                {Object.entries(productsByType).map(([productType, products]) => (
                <div key={productType} className="profile-page-collections-tile">
                    <h2>{productType}</h2>
                    {/* {products.map((product) => (
                        <p key={product.id}>{product.name}</p>

                    ))} */}
                </div>
                ))}
            </div>

        </div>
        </>
    )
}

export default ProfilePage;
