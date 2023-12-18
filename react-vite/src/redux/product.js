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
      throw new Error(`The following error occuring while attempting to fetch all existing products: ${error.message}`)
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
        default:
            return state;
    }

}
