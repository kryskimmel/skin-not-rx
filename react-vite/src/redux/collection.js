const GET_COLLECTIONS = 'collection/GET_COLLECTIONS';
const ADD_COLLECTION = 'collection/ADD_COLLECTION';
const EDIT_COLLECTION = 'collection/EDIT_COLLECTION';
const DELETE_COLLECTION = 'collection/DELETE_COLLECTION';
const GET_CURR_USER_COLLECTIONS = 'collection/GET_CURR_USER_COLLECTIONS';


const getCollections = (collections) => ({
  type: GET_COLLECTIONS,
  payload: collections
});

const addCollection = (newCollection) => ({
  type: ADD_COLLECTION,
  payload: newCollection
});

const editCollection = (editedCollection) => ({
    type: EDIT_COLLECTION,
    payload: editedCollection
});

const deleteCollection = (deletedCollection) => ({
    type: DELETE_COLLECTION,
    payload: deletedCollection
});

const getCurrUserCollections = (currUserCollections) => ({
  type: GET_CURR_USER_COLLECTIONS,
  payload: currUserCollections
});


// GET ALL COLLECTIONS
export const getAllCollections = () => async (dispatch) => {
  try {
    const response = await fetch("/api/collections", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`There was an error fetching all existing collections.`)
    }
    const allCollections = await response.json()
    await dispatch(getCollections(allCollections))
  } catch (error) {
    throw new Error(`The following error occured while attempting to fetch all existing collections: ${error.message}`)
  }
};


// ADD A COLLECTION
export const createCollection = (newCollectionData) => async (dispatch) => {
  console.log('Inside thunk (new collection data):', newCollectionData)
  try {
    const response = await fetch("/api/collections/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCollectionData),
    })
    console.log('After fetch call');
    if (!response.ok) {
      throw new Error(`There was an error in creating your collection.`)
    }
    const newCollection = await response.json()
    console.log('new collection', newCollection)
    await dispatch(addCollection(newCollection))
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`The following error occured while attempting to create your collection: ${error.message}`)

  }
};


// EDIT A COLLECTION
export const modifyCollection = (collection_id, editedCollectionData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/collections/${collection_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedCollectionData),
    })
    if (!response.ok) {
      throw new Error(`There was an error in modifying your collection.`)
    }
    const modifiedCollection = await response.json()
    await dispatch(editCollection(modifiedCollection))
  } catch (error) {
    throw new Error(`The following error occured while attempting to modify your collection: ${error.message}`)
  }
};


// DELETE A COLLECTION
export const removeCollection = (collection_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/collections/${collection_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error(`There was an error in deleting your collection.`)
    }
    await dispatch(deleteCollection(collection_id))
  } catch (error) {
    throw new Error(`The following error occured while attempting to delete your collection: ${error.message}`)
  }
};

// GET CURRENT USERS COLLECTIONS
export const viewCurrUserCollections = () => async (dispatch) => {
  try {
    const response = await fetch("/api/users/current/collections", {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error(`There was an error in fetching your collections.`)
    }
    const data = await response.json();
    await dispatch(getCurrUserCollections(data))
  } catch (error) {
    throw new Error(`The following error occured while attempting to fetch your collections: ${error.message}`)
  }
}


// Reducer
const initialState = {allCollections:[], byId:{}}

export default function reducer(state = initialState, action){
  let newState = {}

  switch (action.type) {
    case GET_COLLECTIONS:
      if (action.payload.Collections) {
        const byId = {};
        action.payload.Collections.forEach((collection) => {
          byId[collection.id] = collection
        });
        newState = {
          allCollections: action.payload.Collections,
          byId: byId
        };
        return newState;
      } else {
        newState = action.payload
        return newState;
      }
    case ADD_COLLECTION:
      newState = {...state, [action.payload.id] : action.payload}
      return newState;
    case EDIT_COLLECTION:
      newState = {...state, [action.payload.id] : action.payload}
      return newState;
    case DELETE_COLLECTION:
      delete newState[action.payload];
      return newState;
    case GET_CURR_USER_COLLECTIONS:
      if (action.payload.MyCollections) {
        const byId = {};
        action.payload.MyCollections.forEach((collection) => {
          byId[collection.id] = collection
        });
        newState = {
          allCollections: action.payload.MyCollections,
          byId: byId
        };
        return newState;
      } else {
        newState = action.payload
        return newState;
      }
    default:
      return state;
  }

}
