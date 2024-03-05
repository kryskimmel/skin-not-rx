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
  'products/createProduct',
  async (newProductData) => {
    const req = await fetch('/api/products/', {
      method: 'POST',
      body: newProductData,
    });
    if (!req.ok) {
      throw new Error(`There was an error in creating your new product`);
    }
    const res = await req.json();
    return res;
  }
);

export const editProduct = createAsyncThunk(
  'products/updateProduct', async ({productId, updatedProductData}) => {
    const req = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedProductData)
    });
    if (!req.ok) {
      throw new Error(`There was an error in updating your product`)
    }
    const res = await req.json();
    return res;
  }
);

export const removeProduct = createAsyncThunk(
  'products/deleteProduct', async (product_id) => {
    const req = await fetch(`/api/products/${product_id}`, {
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
  byProductType: []
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
        state.byProductType[productTypeKey] = state.byProductType[productTypeKey].map(
          (product) => (product.id === editedProduct.id ? editedProduct : product)
        );
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
      });
    }
});

export default productSlice;


// // GET CURRENT USERS PRODUCTS
// export const viewCurrUserProducts = () => async (dispatch) => {
//   try {
//     const response = await fetch("/api/users/current/products", {
//       method: "GET"
//     });
//     if (!response.ok) {
//       throw new Error(`There was an error in fetching your products.`)
//     }
//     const data = await response.json();
//     await dispatch(getCurrUserProducts(data))
//   } catch (error) {
//     throw new Error(`The following error occured while attempting to fetch your products: ${error.message}`)
//   }
// }




// // DELETE A PRODUCT
// export const removeProduct = (product_id) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/products/${product_id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" }
//     });
//     console.log('product id inside thunk',product_id)
//     if (!response.ok) {
//       throw new Error(`There was an error in deleting your product.`)
//     }
//     dispatch(deleteProduct(product_id))
//     return response
//   } catch (error) {
//     throw new Error(`The following error occured while attempting to delete your product: ${error.message}`)
//   }
// };


// // EDIT A PRODUCT
// export const modifyProduct = (product_id, editedProductData) => async (dispatch) => {
//   console.log('modified product data in thunk', product_id, editedProductData)
//   try {
//     const response = await fetch(`/api/products/${product_id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editedProductData),
//     })
//     if (response.ok) {
//       const data = await response.json()
//       await dispatch(editProduct(data))
//       return response;
//     } else {
//       throw response;
//     }
//   } catch (error) {
//     return error
//   }
// };





// export const createProduct = (newProductData) => async (dispatch) => {
//   const response = await fetch("/api/products/", {
//     method: "POST",
//     body: newProductData
//   })
//   if (response.ok) {
//     const newProduct = await response.json()
//     dispatch(addProduct(newProduct));
//     return newProduct;
//   } else if (response.status < 500) {
//     const errorMessages = await response.json()
//     return errorMessages
//   } else {
//     return { server: "Something went wrong"}
//   }
// }









// const GET_PRODUCTS = 'product/GET_PRODUCTS';
// const ADD_PRODUCT = 'product/ADD_PRODUCT';
// const EDIT_PRODUCT = 'product/EDIT_PRODUCT';
// const DELETE_PRODUCT = 'product/DELETE_PRODUCT';
// const GET_CURR_USER_PRODUCTS = 'product/GET_CURR_USER_PRODUCTS';



// const getProducts = (products) => ({
//   type: GET_PRODUCTS,
//   payload: products
// });

// const addProduct = (newProduct) => ({
//   type: ADD_PRODUCT,
//   payload: newProduct
// });

// const editProduct = (editedProduct) => ({
//   type: EDIT_PRODUCT,
//   payload: editedProduct
// });

// const deleteProduct = (deletedProduct) => ({
//   type: DELETE_PRODUCT,
//   payload: deletedProduct
// });


// const getCurrUserProducts = (currUserProducts) => ({
//   type: GET_CURR_USER_PRODUCTS,
//   payload: currUserProducts
// });




// // GET ALL PRODUCTS
// export const getAllProducts = () => async (dispatch) => {
//   try {
//     const response = await fetch("/api/products", {
//       method: "GET",
//     });
//     if (!response.ok) {
//       throw new Error(`There was an error fetching all existing products.`)
//     }
//     const allProducts = await response.json()
//     await dispatch(getProducts(allProducts))
//   } catch (error) {
//     throw new Error(`The following error occured while attempting to fetch all existing products: ${error.message}`)
//   }
// };


// ADD A PRODUCT











// Reducer
// const initialState = {allProducts:[], byId:{}, byProductType:[]}

// export default function reducer(state = initialState, action) {
//   let newState = {};

//   switch (action.type) {
//     case GET_PRODUCTS: {
//       if (action.payload.Products) {
//         const byId = {};
//         action.payload.Products.forEach((product) => {
//             byId[product.id] = product
//         });
//         const filterCleansers = action.payload.Products.filter((product => product.product_type === "Cleanser"))
//         const filterExfoliators = action.payload.Products.filter((product => product.product_type === "Exfoliator"))
//         const filerTreatments = action.payload.Products.filter((product => product.product_type === "Treatment"))
//         const filterSerums = action.payload.Products.filter((product => product.product_type === "Serum"))
//         const filterSuncreeens = action.payload.Products.filter((product => product.product_type === "Sunscreen"))
//         const filterMoisturizers = action.payload.Products.filter((product => product.product_type === "Moisturizer"))
//         const filterToners = action.payload.Products.filter((product => product.product_type === "Toner"))
//         const filterFaceMasks = action.payload.Products.filter((product => product.product_type === "Face Mask"))
//         const filterEyeSerums = action.payload.Products.filter((product => product.product_type === "Eye Serum"))
//         const filterEyeCreams = action.payload.Products.filter((product => product.product_type === "Eye Cream"))
//         const filterLipRepairAndProtectants = action.payload.Products.filter((product => product.product_type === "Lip Repair & Protectant"))

//         newState = {
//             allProducts: action.payload.Products,
//             byId: byId,
//             byProductType: {
//               "Cleansers": filterCleansers,
//               "Exfoliators": filterExfoliators,
//               "Treatments" : filerTreatments,
//               "Serums": filterSerums,
//               "Sunscreens": filterSuncreeens,
//               "Moisturizers": filterMoisturizers,
//               "Toners": filterToners,
//               "Face Masks": filterFaceMasks,
//               "Eye Serums": filterEyeSerums,
//               "Eye Creams": filterEyeCreams,
//               "Lip Repair And Protectants": filterLipRepairAndProtectants,
//             },
//         };
//         return newState;
//       } else {
//           newState = action.payload
//           return newState;
//       } 
//     }   
//     case ADD_PRODUCT: {
//       newState.byId = { ...state.byId, [action.payload.id]: action.payload };
//       newState.allProducts = Object.values(newState.byId);
//       newState.byProductType = {...state.byProductType, [`${action.payload.product_type}s`]: [action.payload] }
//       return newState;
//     }
//     case EDIT_PRODUCT: {
//       const byProductType = {}
//       if (action.payload.product_type === "Cleanser") byProductType["Cleansers"] = [action.payload];
//       if (action.payload.product_type === "Exfoliator") byProductType["Exfoliators"] = [action.payload];
//       if (action.payload.product_type === "Treatment") byProductType["Treatments"] = [action.payload];
//       if (action.payload.product_type === "Serum") byProductType["Serums"] = [action.payload];
//       if (action.payload.product_type === "Sunscreen") byProductType["Sunscreens"] = [action.payload];
//       if (action.payload.product_type === "Moisturizer") byProductType["Moisturizers"] = [action.payload];
//       if (action.payload.product_type === "Toner") byProductType["Toners"] =[action.payload];
//       if (action.payload.product_type === "Face Mask") byProductType["Face Masks"] = [action.payload];
//       if (action.payload.product_type === "Eye Serum") byProductType["Eye Serums"] = [action.payload];
//       if (action.payload.product_type === "Eye Cream") byProductType["Eye Creams"] = [action.payload];
//       if (action.payload.product_type === "Lip Repair & Protectant") byProductType["Lip Repair And Protectants"] = [action.payload];

//       newState = JSON.parse(JSON.stringify(state));
//       newState.byId[`${action.payload.id}`] = action.payload
//       newState.allProducts = Object.values(newState.byId)
//       return newState;
//     }
//     case DELETE_PRODUCT: {
//       // eslint-disable-next-line no-unused-vars
//       const {[action.payload]: deletedProduct, ...updatedState} = state.byId;
//       return {...state, byId: updatedState}
//     }
//     case GET_CURR_USER_PRODUCTS: {
//       if (action.payload.MyProducts) {
//         const byId = {};
//         action.payload.MyProducts.forEach((product) => {
//           byId[product.id] = product
//         });
//         const filterCleansers = action.payload.MyProducts.filter((product => product.product_type === "Cleanser"))
//         const filterExfoliators = action.payload.MyProducts.filter((product => product.product_type === "Exfoliator"))
//         const filerTreatments = action.payload.MyProducts.filter((product => product.product_type === "Treatment"))
//         const filterSerums = action.payload.MyProducts.filter((product => product.product_type === "Serum"))
//         const filterSuncreeens = action.payload.MyProducts.filter((product => product.product_type === "Sunscreen"))
//         const filterMoisturizers = action.payload.MyProducts.filter((product => product.product_type === "Moisturizer"))
//         const filterToners = action.payload.MyProducts.filter((product => product.product_type === "Toner"))
//         const filterFaceMasks = action.payload.MyProducts.filter((product => product.product_type === "Face Mask"))
//         const filterEyeSerums = action.payload.MyProducts.filter((product => product.product_type === "Eye Serum"))
//         const filterEyeCreams = action.payload.MyProducts.filter((product => product.product_type === "Eye Cream"))
//         const filterLipRepairAndProtectants = action.payload.MyProducts.filter((product => product.product_type === "Lip Repair & Protectant"))
//         newState = {
//           allProducts: action.payload.MyProducts,
//           byId: byId,
//           byProductType: {
//             "Cleansers": filterCleansers,
//             "Exfoliators": filterExfoliators,
//             "Treatments" : filerTreatments,
//             "Serums": filterSerums,
//             "Sunscreens": filterSuncreeens,
//             "Moisturizers": filterMoisturizers,
//             "Toners": filterToners,
//             "Face Masks": filterFaceMasks,
//             "Eye Serums": filterEyeSerums,
//             "Eye Creams": filterEyeCreams,
//             "Lip Repair And Protectants": filterLipRepairAndProtectants,
//           },
//         };
//         return newState;
//       } else {
//         newState = action.payload
//         return newState;
//       }
//     }
//     default:
//         return state;
//   }
// }
