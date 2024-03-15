import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  'products/fetchAllProducts', async () => {
    const req = await fetch('/api/products', {
      method: 'GET'
    });
    if (!req.ok) {
      throw new Error(`There was an error in fetching all existing products`)
    }
    const res = await req.json();
    return res;
  }
);

export const getCurrUserProducts = createAsyncThunk(
  'products/fetchCurrUserProducts', async () => {
    const req = await fetch(`/api/users/current/products`, {
      method: 'GET',
    });
    if (!req.ok) {
      throw new Error(`There was an error in fetching your products`)
    }
    const res = await req.json();
    return res;
  }
);

export const addProduct = createAsyncThunk(
  'products/createProduct', async (newProductData) => {
    const req = await fetch('/api/products/', {
      method: 'POST',
      body: newProductData,
    });
    if (!req.ok) {
      const res = await req.json();
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      } else {
        throw new Error(`There was an error in creating your new product`);
      }
    }
    const res = await req.json();
    return res;
  }
);

export const editProduct = createAsyncThunk(
  'products/updateProduct', async ({productId, updatedProductData}) => {
    const req = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      body: updatedProductData,
    });
    if (!req.ok) {
      const res = await req.json();
      if (res.errors) {
        throw new Error(JSON.stringify(res.errors));
      } else {
        throw new Error(`There was an error in updating your product`);
      }
    }
    const res = await req.json();
    return res;
  }
);

export const removeProduct = createAsyncThunk(
  'products/deleteProduct', async (productId) => {
    const req = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
    if (!req.ok) {
      throw new Error(`There was an error in deleting your product`)
    }
    const res = await req.json();
    return res;
  }
);


const initialProductState = {
  allProducts: [],
  byId: {},
  byProductType: [],
  errors: null
};


const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.Products || [];
        state.byId = {};
        state.byProductType = {};

        action.payload.Products.forEach((product) => {
          state.byId[product.id] = product;
          state.byProductType[`${product.product_type}s`] = state.byProductType[
            `${product.product_type}s`
          ]
            ? [...state.byProductType[`${product.product_type}s`], product]
            : [product];
        });
      })
      .addCase(getCurrUserProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.byId = {};
        state.byProductType = {};
      
        if (Array.isArray(action.payload)) {
          action.payload.forEach((product) => {
            state.byId[product.id] = product;
            state.byProductType[`${product.product_type}s`] = state.byProductType[
              `${product.product_type}s`
            ]
              ? [...state.byProductType[`${product.product_type}s`], product]
              : [product];
          });
        }
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        const product = action.payload;
        state.byId[product.id] = product;
        if (!Array.isArray(state.allProducts)) {
          state.allProducts = [];
        }
        state.allProducts = [...state.allProducts, product];
        const productTypeKey = `${product.product_type}s`;
        state.byProductType[productTypeKey] = state.byProductType[productTypeKey]
          ? [...state.byProductType[productTypeKey], product]
          : [product];
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const editedProduct = action.payload;
        state.byId[editedProduct.id] = editedProduct;
        state.allProducts = Object.values(state.byId);
        const productTypeKey = `${editedProduct.product_type}s`;
        const productsOfType = state.byProductType[productTypeKey];
        if (Array.isArray(productsOfType)) {
          state.byProductType[productTypeKey] = productsOfType.map(
            (product) => (product.id === editedProduct.id ? editedProduct : product)
          );
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        delete state.byId[productId];
        state.allProducts = state.allProducts.filter(product => product.id !== productId);
      
        for (const key in state.byProductType) {
          state.byProductType[key] = state.byProductType[key].filter(
            (product) => product.id !== productId
          );
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.errors = action.error.message;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.errors = action.error.message;
      })
    }
});

export default productSlice;