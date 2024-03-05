import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCollections = createAsyncThunk(
  'collections/fetchAllCollections', async () => {
    const req = await fetch('/api/collections', {
      method: 'GET'
    });
    if (!req.ok) {
      throw new Error(`There was an error in fetching all existing collections`)
    }
    const res = await req.json();
    return res;
  }
);

export const getCurrUserCollections = createAsyncThunk(
  'collections/fetchCurrUserCollections', async () => {
    const req = await fetch(`/api/users/current/collections`, {
      method: 'GET',
    });
    if (!req.ok) {
      throw new Error(`There was an error in fetching your collections`)
    }
    const res = await req.json();
    return res;
  }
);

export const addCollection = createAsyncThunk(
  'collections/createCollection',
  async (newCollectionData) => {
    const req = await fetch('/api/collections/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newCollectionData),
    });
    if (!req.ok) {
      throw new Error(`There was an error in creating your new collection`);
    }
    const res = await req.json();
    return res;
  }
);

export const editCollection = createAsyncThunk(
  'collections/updateCollection', async ({collectionId, updatedCollectionData}) => {
    const req = await fetch(`/api/collections/${collectionId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedCollectionData)
    });
    if (!req.ok) {
      throw new Error(`There was an error in updating your collection`)
    }
    const res = await req.json();
    return res;
  }
);

export const removeCollection = createAsyncThunk(
  'collections/deleteCollection', async (collectionId) => {
    const req = await fetch(`/api/collections/${collectionId}`, {
      method: 'DELETE',
    });
    if (!req.ok) {
      throw new Error(`There was an error in deleting your collection`)
    }
    const res = await req.json();
    return res;
  }
);

const initialCollectionState = {
  allCollections: [],
  byId: {},
};

const collectionSlice = createSlice({
  name: 'collections',
  initialState: initialCollectionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
    }
});

export default collectionSlice;


// // Reducer
// const initialState = {allCollections:[], byId:{}}

// export default function reducer(state = initialState, action){
//   let newState = {}

//   switch (action.type) {
//     case GET_COLLECTIONS:
//       if (action.payload.Collections) {
//         const byId = {};
//         action.payload.Collections.forEach((collection) => {
//           byId[collection.id] = collection
//         });
//         newState = {
//           allCollections: action.payload.Collections,
//           byId: byId
//         };
//         return newState;
//       } else {
//         newState = action.payload
//         return newState;
//       }
//     case ADD_COLLECTION:
//       newState.byId = { ...state.byId, [action.payload.id]: action.payload };
//       newState.allCollections = Object.values(newState.byId);
//       // newState = JSON.parse(JSON.stringify(state));
//       // newState.byId[`${action.payload.id}`] = action.payload
//       // newState.allCollections = Object.values(newState.byId)
//       return newState;

//       case EDIT_COLLECTION:
//         newState = JSON.parse(JSON.stringify(state));
//         newState.byId[`${action.payload.id}`] = action.payload
//         newState.allCollections = Object.values(newState.byId)
//         // newState = {...state, [action.payload.id] : action.payload}
//         return newState;
//     case DELETE_COLLECTION:
//       newState = JSON.parse(JSON.stringify(state));
//       delete newState[action.payload];
//       return newState;
//     case GET_CURR_USER_COLLECTIONS:
//       if (action.payload.MyCollections) {
//         const byId = {};
//         action.payload.MyCollections.forEach((collection) => {
//           byId[collection.id] = collection
//         });
//         newState = {
//           allCollections: action.payload.MyCollections,
//           byId: byId
//         };
//         return newState;
//       } else {
//         newState = action.payload
//         return newState;
//       }
//     default:
//       return state;
//   }

// }
