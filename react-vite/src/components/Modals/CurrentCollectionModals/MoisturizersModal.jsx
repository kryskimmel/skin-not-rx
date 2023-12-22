import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from "../../../redux/product";
import randomInt from "../../../utils/randomIntGenerator";
import { useModal } from '../../../context/Modal';
import { Icon } from '@iconify/react';
import "./CurrentCollectionModals.css";


function MoisturizersModal({collectionName}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    const moisturizerProducts = useSelector(store => store.product.byProductType[collectionName]);
    useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);


    const userProducts = moisturizerProducts.filter(product => product.user_id === user.id);
    // console.log('--filtered--',userProducts)

    // console.log(moisturizerProducts)

    return (
        <>
        <div className='users-products-container'>
            <h1 style={{display:"flex", justifyContent:"center"}}>MOISTURIZERS</h1>
            {!userProducts &&  <p>You have not created any {collectionName}</p>}
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

export default MoisturizersModal;