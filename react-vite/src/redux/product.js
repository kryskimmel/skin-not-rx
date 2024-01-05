const GET_PRODUCTS = 'product/GET_PRODUCTS';
const ADD_PRODUCT = 'product/ADD_PRODUCT';
const EDIT_PRODUCT = 'product/EDIT_PRODUCT';
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';
const GET_PRODUCT_DETAILS = 'product/GET_PRODUCT_DETAILS';
const GET_CURR_USER_PRODUCTS = 'product/GET_CURR_USER_PRODUCTS';



const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
});

const addProduct = (newProduct) => ({
  type: ADD_PRODUCT,
  payload: newProduct
});

const editProduct = (editedProduct) => ({
  type: EDIT_PRODUCT,
  payload: editedProduct
});

const deleteProduct = (deletedProduct) => ({
  type: DELETE_PRODUCT,
  payload: deletedProduct
});

const getProductDetails = (productDetails) => ({
  type: GET_PRODUCT_DETAILS,
  payload: productDetails
})

const getCurrUserProducts = (currUserProducts) => ({
  type: GET_CURR_USER_PRODUCTS,
  payload: currUserProducts
});




// GET ALL PRODUCTS
export const getAllProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products", {
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
    console.log('THE NEW PRODUCT DATA:', newProductData)
    const response = await fetch("/api/products/", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newProductData)
    })
    if (!response.ok) {
      console.log('message of failed response:', newProduct)
      throw new Error(`There was an error in creating your product`)
    }
    const newProduct = await response.json()
    dispatch(addProduct(newProduct))
    return newProduct;
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
    console.log('product id inside thunk',product_id)
    if (!response.ok) {
      throw new Error(`There was an error in deleting your product.`)
    }
    dispatch(deleteProduct(product_id))
    return response
  } catch (error) {
    throw new Error(`The following error occured while attempting to delete your product: ${error.message}`)
  }
};


// GET PRODUCT DETAILS
export const viewProductDetails = (setSelectedProductId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${setSelectedProductId}`, {
      method: "GET"
    });
    console.log('the response', response)
    if (!response.ok) {
      throw new Error("There was an error in fetching the selected product's details.")
    }
    const data = await response.json();

    await dispatch(getProductDetails(data))
  }
  catch (error) {
    throw new Error(`The following error occured while attempting to fetch the selected products details: ${error.message}`)
  }
}

// GET CURRENT USERS PRODUCTS
export const viewCurrUserProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/users/current/products", {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error(`There was an error in fetching your products.`)
    }
    const data = await response.json();
    await dispatch(getCurrUserProducts(data))
  } catch (error) {
    throw new Error(`The following error occured while attempting to fetch your products: ${error.message}`)
  }
}



// Reducer
const initialState = {allProducts:[], byId:{}, byProductType:[], selectedProduct:{}}

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
            const showAllProducts = action.payload.Products

            newState = {
                allProducts: action.payload.Products,
                byId: byId,
                byProductType: {
                  "Cleansers": filterCleansers,
                  "Exfoliators": filterExfoliators,
                  "Treatments" : filerTreatments,
                  "Serums": filterSerums,
                  "Sunscreens": filterSuncreeens,
                  "Moisturizers": filterMoisturizers,
                  "Toners": filterToners,
                  "Face Masks": filterFaceMasks,
                  "Eye Serums": filterEyeSerums,
                  "Eye Creams": filterEyeCreams,
                  "Lip Repair And Protectants": filterLipRepairAndProtectants,
                  "All Products": showAllProducts
                },
                selectedProduct: {}
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
      newState = JSON.parse(JSON.stringify(state));
      delete newState[action.payload];
      return newState;
    case GET_PRODUCT_DETAILS:
      if (action.payload.ProductDetails) {
        newState = {...state, selectedProduct: action.payload.productDetails}
      }
    case GET_CURR_USER_PRODUCTS:
      if (action.payload.MyProducts) {
        const byId = {};
        action.payload.MyProducts.forEach((product) => {
          byId[product.id] = product
        });
        const filterCleansers = action.payload.MyProducts.filter((product => product.product_type === "Cleanser"))
        const filterExfoliators = action.payload.MyProducts.filter((product => product.product_type === "Exfoliator"))
        const filerTreatments = action.payload.MyProducts.filter((product => product.product_type === "Treatment"))
        const filterSerums = action.payload.MyProducts.filter((product => product.product_type === "Serum"))
        const filterSuncreeens = action.payload.MyProducts.filter((product => product.product_type === "Sunscreen"))
        const filterMoisturizers = action.payload.MyProducts.filter((product => product.product_type === "Moisturizer"))
        const filterToners = action.payload.MyProducts.filter((product => product.product_type === "Toner"))
        const filterFaceMasks = action.payload.MyProducts.filter((product => product.product_type === "Face Mask"))
        const filterEyeSerums = action.payload.MyProducts.filter((product => product.product_type === "Eye Serum"))
        const filterEyeCreams = action.payload.MyProducts.filter((product => product.product_type === "Eye Cream"))
        const filterLipRepairAndProtectants = action.payload.MyProducts.filter((product => product.product_type === "Lip Repair & Protectant"))
        const showAllProducts = action.payload.MyProducts
        newState = {
          allProducts: action.payload.MyProducts,
          byId: byId,
          byProductType: {
            "Cleansers": filterCleansers,
            "Exfoliators": filterExfoliators,
            "Treatments" : filerTreatments,
            "Serums": filterSerums,
            "Sunscreens": filterSuncreeens,
            "Moisturizers": filterMoisturizers,
            "Toners": filterToners,
            "Face Masks": filterFaceMasks,
            "Eye Serums": filterEyeSerums,
            "Eye Creams": filterEyeCreams,
            "Lip Repair And Protectants": filterLipRepairAndProtectants,
            "All Products": showAllProducts
          },
          selectedProduct: {}
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
