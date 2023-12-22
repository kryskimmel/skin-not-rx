import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from "../../../redux/product";
import randomInt from "../../../utils/randomIntGenerator";
import { useModal } from '../../../context/Modal';
import { Icon } from '@iconify/react';


function ExfoliatorsModal({collectionName, items}) {
    return (
        <>
        <div>
            <h1>EXFOLIATOR MODAL</h1>
            <p>You have not created any {collectionName}</p>
            <p>{items.length}</p>

            {console.log('collection name', collectionName)}
            {console.log('the items', items)}
        </div>
        </>
    )

}

export default ExfoliatorsModal;
