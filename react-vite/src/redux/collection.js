const GET_COLLECTION = 'product/GET_COLLECTION';
const ADD_COLLECTION = 'product/ADD_COLLECTION';
const EDIT_COLLECTION = 'product/EDIT_COLLECTION';
const DELETE_COLLECTION = 'product/DELETE_COLLECTION';


const getCollection = () => ({
  type: GET_COLLECTION,
  payload: collection
});

const addCollection = () => ({
  type: ADD_COLLECTION,
  payload: newCollection
});

const editCollection = () => ({
    type: EDIT_COLLECTION,
    payload: editedCollection
});

const deleteCollection = () => ({
    type: DELETE_COLLECTION,
    payload: deletedCollection
})
