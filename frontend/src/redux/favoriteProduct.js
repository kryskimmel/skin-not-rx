import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFavoriteProducts = createAsyncThunk(
  'favoriteProducts/fetchAllFavoriteProducts', async () => {
    const req = await fetch('/api/users/current/favorites/products', {
      method: 'GET'
    });
    if (!req.ok) {
      throw new Error(`There was an error in fetching your favorite products`)
    }
    const res = await req.json();
    return res;
  }
);

export const addProductToFavorites = createAsyncThunk(
  'favoriteProducts/createFavoriteProduct', async (newFavoriteProductData) => {
    const req = await fetch('/api/users/current/favorites/products', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newFavoriteProductData)
    });
    if (!req.ok) {
      throw new Error(`There was an error in favoriting the selected product`)
    }
    const res = await req.json();
    return res;
  }
);

export const removeProductFromFavorites = createAsyncThunk(
  'favoriteProducts/deleteFavoriteProduct', async (favoriteId) => {
    const req = await fetch(`/api/users/current/favorites/products/${favoriteId}`, {
      method: 'DELETE',
    });
    if (!req.ok) {
      throw new Error(`There was an error in removing the selected product from your favorites`)
    }
    const res = await req.json();
    return res;
  }
);


const initialFavoriteProductState = {
  allFavoritedProducts: [],
  byId: {},
};


const favoriteProductSlice = createSlice({
  name: 'favoriteProducts',
  initialState: initialFavoriteProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getFavoriteProducts.fulfilled, (state, action) => {
      state.allFavoritedProducts = action.payload.FavoriteProducts || [];
      state.byId = {};
      action.payload.FavoriteProducts.forEach((faveProduct) => {
        state.byId[faveProduct.id] = faveProduct;
      })
    })
    .addCase(addProductToFavorites.fulfilled, (state, action) => {
      const newFavoriteProduct = action.payload;
      state.byId[newFavoriteProduct.id] = newFavoriteProduct;
      state.allFavoritedProducts = [...state.allFavoritedProducts, newFavoriteProduct];
    })
    .addCase(removeProductFromFavorites.fulfilled, (state, action) => {
      const favoriteProductId = action.payload;
      delete state.byId[favoriteProductId];
      state.allFavoritedProducts = state.allFavoritedProducts.filter(faveProduct => faveProduct.id !== favoriteProductId);
    })
  }
});

export default favoriteProductSlice;