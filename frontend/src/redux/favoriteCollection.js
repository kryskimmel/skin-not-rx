import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFavoriteCollections = createAsyncThunk(
  'favoriteCollections/fetchAllFavoriteCollections', async () => {
    const req = await fetch('/api/users/current/favorites/collections', {
      method: 'GET'
    });
    if (!req.ok) {
      throw new Error(`There was an error in fetching your favorite collections`)
    }
    const res = await req.json();
    return res;
  }
);

export const addCollectionToFavorites = createAsyncThunk(
  'favoriteCollections/createFavoriteCollection', async (newFavoriteCollectionData) => {
    const req = await fetch('/api/users/current/favorites/collections', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newFavoriteCollectionData)
    });
    if (!req.ok) {
      throw new Error(`There was an error in favoriting the selected collection`)
    }
    const res = await req.json();
    return res;
  }
);

export const removeCollectionFromFavorites = createAsyncThunk(
  'favoriteCollections/deleteFavoriteCollection', async (favorite_id) => {
    const req = await fetch(`/api/users/current/favorites/collections/${favorite_id}`, {
      method: 'DELETE',
    });
    if (!req.ok) {
      throw new Error(`There was an error in removing the selected collection from your favorites`)
    }
    return favorite_id;
  }
);


const initialFavoriteCollectionState = {
    allFavoritedCollections: [],
    byId: {},
  };


const favoriteCollectionSlice = createSlice({
  name: 'favoriteCollections',
  initialState: initialFavoriteCollectionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getFavoriteCollections.fulfilled, (state, action) => {
        if (action.payload.FavoriteCollections) {
          state.allFavoritedCollections = action.payload.FavoriteCollections || [];
          state.byId = {};
          action.payload.FavoriteCollections.forEach((faveCollection) => {
            state.byId[faveCollection.id] = faveCollection;
          })
        }
      })
      .addCase(addCollectionToFavorites.fulfilled, (state, action) => {
        const newFavoriteCollection = action.payload;
        state.byId[newFavoriteCollection.id] = newFavoriteCollection;
        if (!Array.isArray(state.allFavoritedCollections)) {
          state.allFavoritedCollections = [];
        }
        state.allFavoritedCollections = [...state.allFavoritedCollections, newFavoriteCollection];
      })
      .addCase(removeCollectionFromFavorites.fulfilled, (state, action) => {
        const favoriteCollectionId = action.payload;
        delete state.byId[favoriteCollectionId];
        state.allFavoritedCollections = state.allFavoritedCollections.filter(faveCollection => faveCollection.id !== favoriteCollectionId);
      })
    }
});

export default favoriteCollectionSlice;