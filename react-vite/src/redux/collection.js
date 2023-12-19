const GET_COLLECTIONS = 'product/GET_COLLECTION';
const ADD_COLLECTION = 'product/ADD_COLLECTION';
const EDIT_COLLECTION = 'product/EDIT_COLLECTION';
const DELETE_COLLECTION = 'product/DELETE_COLLECTION';


const getCollections = () => ({
  type: GET_COLLECTIONS,
  payload: collections
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


// GET ALL COLLECTIONS
export const getAllCollections = () => async (dispatch) => {
  try {
    const response = await fetch("/api/collections/explore", {
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
  try {
    const response = await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCollectionData),
    })
    if (!response.ok) {
      throw new Error(`There was an error in creating your collection.`)
    }
    const newCollection = await response.json()
    await dispatch(addCollection(newCollection))
  } catch (error) {
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


// Reducer
const initialState = {allCollections:[], byId:{}}

export default function reducer(state = initialState, action){
  let newState = {}

  switch (action.type) {
    case GET_COLLECTIONS:
      if (action.payload.Colletions) {
        const byId = {};
        action.payload.Colletions.forEach((collection) => {
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
    default:
      return state;
  }

}
