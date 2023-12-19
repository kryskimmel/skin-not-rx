const GET_PRODUCTS = 'product/GET_PRODUCTS';
const ADD_PRODUCT = 'product/ADD_PRODUCT';
const EDIT_PRODUCT = 'product/EDIT_PRODUCT';
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';


const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
});

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: newProduct
});

const editProduct = () => ({
    type: EDIT_PRODUCT,
    payload: editedProduct
});

const deleteProduct = () => ({
    type: DELETE_PRODUCT,
    payload: deletedProduct
})


// GET ALL PRODUCTS
export const getAllProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products/explore", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`There was an error fetching all existing products.`)
    }
    const allProducts = await response.json()
    await dispatch(getProducts(allProducts))
  } catch (error) {
    throw new Error(`The following error occured while attempting to fetch all existing products: ${error.message}`)
  }
};


// ADD A PRODUCT
export const createProduct = (newProductData) => async (dispatch) => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductData),
    })
    if (!response.ok) {
      throw new Error(`There was an error in creating your product.`)
    }
    const newProduct = await response.json()
    await dispatch(addProduct(newProduct))
  } catch (error) {
    throw new Error(`The following error occured while attempting to create your product: ${error.message}`)

  }
};


// EDIT A PRODUCT
export const modifyProduct = (product_id, editedProductData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${product_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProductData),
    })
    if (!response.ok) {
      throw new Error(`There was an error in modifying your product.`)
    }
    const modifiedProduct = await response.json()
    await dispatch(editProduct(modifiedProduct))
  } catch (error) {
    throw new Error(`The following error occured while attempting to modify your product: ${error.message}`)
  }
};


// DELETE A PRODUCT
export const removeProduct = (product_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${product_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error(`There was an error in deleting your product.`)
    }
    await dispatch(deleteProduct(product_id))
  } catch (error) {
    throw new Error(`The following error occured while attempting to delete your product: ${error.message}`)
  }
};


// Reducer
const initialState = {allProducts:[], byId:{}, byProductType:[]}

export default function reducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case GET_PRODUCTS:
        if (action.payload.Products) {
            const byId = {};
            action.payload.Products.forEach((product) => {
                byId[product.id] = product
            });
            const filterCleansers = action.payload.Products.filter((product => product.product_type === "Cleanser"))
            const filterExfoliators = action.payload.Products.filter((product => product.product_type === "Exfoliator"))
            const filerTreatments = action.payload.Products.filter((product => product.product_type === "Treatment"))
            const filterSerums = action.payload.Products.filter((product => product.product_type === "Serum"))
            const filterSuncreeens = action.payload.Products.filter((product => product.product_type === "Sunscreen"))
            const filterMoisturizers = action.payload.Products.filter((product => product.product_type === "Moisturizer"))
            const filterToners = action.payload.Products.filter((product => product.product_type === "Toner"))
            const filterFaceMasks = action.payload.Products.filter((product => product.product_type === "Face Mask"))
            const filterEyeSerums = action.payload.Products.filter((product => product.product_type === "Eye Serum"))
            const filterEyeCreams = action.payload.Products.filter((product => product.product_type === "Eye Cream"))
            const filterLipRepairAndProtectants = action.payload.Products.filter((product => product.product_type === "Lip Repair & Protectant"))

            newState = {
                allProducts: action.payload.Products,
                byId: byId,
                byProductType: {
                  "cleansers": filterCleansers,
                  "exfoliators": filterExfoliators,
                  "treatments" : filerTreatments,
                  "serums": filterSerums,
                  "sunscreens": filterSuncreeens,
                  "moisturizers": filterMoisturizers,
                  "toners": filterToners,
                  "faceMasks": filterFaceMasks,
                  "eyeSerums": filterEyeSerums,
                  "eyeCreams": filterEyeCreams,
                  "lipRepairAndProtectants": filterLipRepairAndProtectants
                }
            };
            return newState;
        } else {
            newState = action.payload
            return newState;
        }
    case ADD_PRODUCT:
      newState = {...state, [action.payload.id] : action.payload}
      return newState;
    case EDIT_PRODUCT:
      newState = {...state, [action.payload.id] : action.payload}
      return newState;
    case DELETE_PRODUCT:
      delete newState[action.payload];
      return newState;
    default:
        return state;
  }
}
