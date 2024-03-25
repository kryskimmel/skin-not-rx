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
      const res = await req.json();
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      } else {
        throw new Error(`There was an error in creating your new collection`);
      }
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
      const res = await req.json();
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      } else {
        throw new Error(`There was an error in updating your collection`);
      }
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
   return collectionId;
  }
);

const initialCollectionState = {
  allCollections: [],
  byId: {},
  errors: null
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

      if (Array.isArray(action.payload)) {
        action.payload.Collection.forEach((collection) => {
          state.byId[collection.id] = collection;
        })
      }
    })
    .addCase(getCurrUserCollections.fulfilled, (state, action) => {
      state.allCollections = action.payload || [];
      state.byId = {};
      if (Array.isArray(action.payload)) {
        action.payload.forEach((collection) => {
          state.byId[collection.id] = collection;
        })
      }
    })
    .addCase(addCollection.fulfilled, (state, action) => {
      const collection = action.payload;
      state.byId[collection.id] = collection;
      if (!Array.isArray(state.allCollections)) {
        state.allCollections = [];
      }
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
    .addCase(addCollection.rejected, (state, action) => {
      state.errors = action.error.message;
    })
    .addCase(editCollection.rejected, (state, action) => {
      state.errors = action.error.message;
    })
  }
});

export default collectionSlice;