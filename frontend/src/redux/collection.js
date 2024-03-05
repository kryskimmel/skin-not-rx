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
    const req = await fetch('/api/users/current/collections');
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
    .addCase(getAllCollections.fulfilled, (state, action) => {
      state.allCollections = action.payload.Collection || [];
      state.byId = {};
      action.payload.Collection.forEach((collection) => {
        state.byId[collection.id] = collection;
      })
    })
    .addCase(getCurrUserCollections.fulfilled, (state, action) => {
      state.allCollections = action.payload|| [];
      state.byId = {};
      action.payload.forEach((collection) => {
        state.byId[collection.id] = collection;
      })
    })
    .addCase(addCollection.fulfilled, (state, action) => {
      const collection = action.payload;
      state.byId[collection.id] = collection;
      state.allCollections = [...state.allCollections, collection]
    })
    .addCase(editCollection.fulfilled, (state, action) => {
      const editedCollection = action.payload;
      state.byId[editedCollection.id] = editedCollection;
      state.allCollections = Object.values(state.byId);
    })
    .addCase(removeCollection.fulfilled, (state, action) => {
      const collectionId = action.payload;
      delete state.byId[collectionId];
      state.allCollections = state.allCollections.filter(collection => collection.id !== collectionId);
    })
  }
});

export default collectionSlice;