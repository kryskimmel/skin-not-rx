import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from "../../../redux/product";
import randomInt from "../../../utils/randomIntGenerator";
import { useModal } from '../../../context/Modal';
import { Icon } from '@iconify/react';



function CleansersModal({collectionName}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.session.user);
    const cleanserProducts = useSelector(store => store.product.byProductType[collectionName]);
    useEffect(() => { dispatch(productActions.getAllProducts())}, [dispatch]);

    const currentUsersCleansers = {};

    Object.entries(cleanserProducts).forEach((products) => {
    const userProducts = products.filter((product) => product.user_id === user.id);
    currentUsersCleansers["Cleansers"] = userProducts;
    });

    console.log('THE CURRENT USERS CLEANSERS', currentUsersCleansers)





    return (
        <>
        <div>
            <h1>CLEANSER MODAL</h1>
            <p>You have not created any {collectionName}</p>
            {console.log('collection name', collectionName)}
        </div>
        </>
    )

}

export default CleansersModal;
