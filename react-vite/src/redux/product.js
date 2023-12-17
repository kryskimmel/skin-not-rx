const GET_PRODUCT = 'product/GET_PRODUCT';
const ADD_PRODUCT = 'product/ADD_PRODUCT';
const EDIT_PRODUCT = 'product/EDIT_PRODUCT';
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';


const getProduct = () => ({
  type: GET_PRODUCT,
  payload: product
});

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: product
});

const editProduct = () => ({
    type: EDIT_PRODUCT,
    payload: product
});

const deleteProduct = () => ({
    type: DELETE_PRODUCT,
    payload: product
})
