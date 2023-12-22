import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from "../../../redux/product";
import { useModal } from '../../../context/Modal';


function SunscreensModal({collectionName}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    const sunscreenProducts = useSelector(store => store.product.byProductType[collectionName]);
    useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);

    const userProducts = sunscreenProducts.filter(product => product.user_id === user.id);

    return (
        <>
        <div className='users-products-container'>
            <h1 style={{display:"flex", justifyContent:"center"}}>{collectionName.toUpperCase()}</h1>
            {!userProducts.length ? <h2 style={{display:"flex", justifyContent:"center"}}>You have not created any {collectionName}!</h2> : <h2 style={{display:"flex", justifyContent:"center"}}>({userProducts.length} {userProducts.length === 1 ? "Item" : "Items"})</h2>}
            {userProducts?.map((product) =>
                <div className='users-products-tile'>
                    <img src={product.preview_image} alt={product.product_name} width={"200px"} height={"200px"} style={{objectFit:"cover", borderRadius:"15px"}}/>
                    <ul style={{listStyle:"none", paddingLeft:"0px"}}>
                        <li style={{fontWeight:"bold"}}>{product.brand_name}</li>
                        <li>{product.product_name}</li>
                    </ul>
                    <div className='users-products-management-buttons'>
                        <button>UPDATE</button>
                        <button>DELETE</button>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default SunscreensModal;
