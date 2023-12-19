const GET_FAVORITE_PRODUCTS = 'favorite/GET_FAVORITE_PRODUCT';
const ADD_FAVORITE_PRODUCT = 'favorite/ADD_FAVORITE_PRODUCT';
const DELETE_FAVORITE_PRODUCT = 'favorite/DELETE_FAVORITE_PRODUCT';

const GET_FAVORITE_COLLECTIONS = 'favorite/GET_FAVORITE_COLLECTION';
const ADD_FAVORITE_COLLECTION = 'favorite/ADD_FAVORITE_COLLECTION';
const DELETE_FAVORITE_COLLECTION = 'favorite/DELETE_FAVORITE_COLLECTION';


const getFavoriteProducts = () => ({
  type: GET_FAVORITE_PRODUCTS,
  payload: favoriteProduct
});

const addFavoriteProduct = () => ({
  type: ADD_FAVORITE_PRODUCT,
  payload: newFavoriteProduct
});

const deleteFavoriteProduct = () => ({
    type: DELETE_FAVORITE_PRODUCT,
    payload: deletedFavoriteProduct
});

const getFavoriteCollections = () => ({
    type: GET_FAVORITE_COLLECTIONS,
    payload: favoriteCollection
  });

  const addFavoriteCollection = () => ({
    type: ADD_FAVORITE_COLLECTION,
    payload: newFavoriteCollection
  });

  const deleteFavoriteCollection = () => ({
      type: DELETE_FAVORITE_COLLECTION,
      payload: deletedFavoriteCollection
  });


// GET ALL FAVORITED PRODUCTS
export const getAllFavoritedProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/current/favorites/products", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`There was an error fetching your favorited products.`)
    }
    const favoritedProducts = await response.json()
    await dispatch(getFavoriteProducts(favoritedProducts))
  } catch (error) {
    throw new Error(`The following error occured while attempting to fetch your favorited products: ${error.message}`)
  }
};

// ADD A PRODUCT TO FAVORITES
export const addProductToFavorites = (newFavoriteProductData) => async (dispatch) => {
  try {
    const response = await fetch("/api/current/favorites/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFavoriteProductData),
    })
    if (!response.ok) {
      throw new Error(`There was an error in adding the selected product to your favorites.`)
    }
    const newFavoriteProduct = await response.json()
    await dispatch(addFavoriteProduct(newFavoriteProduct))
  } catch (error) {
    throw new Error(`The following error occured while attempting to add the selected product to your favorites: ${error.message}`)
  }
};

// REMOVE A PRODUCT FROM FAVORITES
export const removeProductFromFavorites = (favorite_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/current/favorites/products/${favorite_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error(`There was an error in removing the selected product from your favorites.`)
    }
    await dispatch(deleteFavoriteProduct(favorite_id))
  } catch (error) {
    throw new Error(`The following error occured while attempting to remove the selected product from your favorites: ${error.message}`)
  }
};


// GET ALL FAVORITED COLLECTIONS
export const getAllFavoritedCollections = () => async (dispatch) => {
  try {
    const response = await fetch("/api/current/favorites/collections", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`There was an error fetching your favorited collections.`)
    }
    const favoritedCollections = await response.json()
    await dispatch(getFavoriteCollections(favoritedCollections))
  } catch (error) {
    throw new Error(`The following error occured while attempting to fetch your favorited collections: ${error.message}`)
  }
};

// ADD A COLLECTION TO FAVORITES
export const addCollectionToFavorites = (newFavoriteCollectionData) => async (dispatch) => {
  try {
    const response = await fetch("/api/current/favorites/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFavoriteCollectionData),
    })
    if (!response.ok) {
      throw new Error(`There was an error in adding the selected collection to your favorites.`)
    }
    const newFavoriteCollection = await response.json()
    await dispatch(addFavoriteCollection(newFavoriteCollection))
  } catch (error) {
    throw new Error(`The following error occured while attempting to add the selected collection to your favorites: ${error.message}`)
  }
};

// REMOVE A COLLECTION FROM FAVORITES
export const removeCollectionFromFavorites = (favorite_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/current/favorites/collections/${favorite_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error(`There was an error in removing the selected collection from your favorites.`)
    }
    await dispatch(deleteFavoriteCollection(favorite_id))
  } catch (error) {
    throw new Error(`The following error occured while attempting to remove the selected collection from your favorites: ${error.message}`)
  }
};


// Reducer
const initialState = {allFavoritedProducts:[], favoritedProductsById:{}, allFavoritedCollections:[], favoritedCollectionsById:{}}

export default function reducer(state = initialState, action) {
  let newState = {}

  switch (action.type) {
    case GET_FAVORITE_PRODUCTS:
      if (action.payload.FavoriteProducts) {
        const favoritedProductsById = {};
        action.payload.FavoriteProducts.forEach((faveProduct) => {
          favoritedProductsById[faveProduct.id] = faveProduct
        });

        newState = {
          allFavoritedProducts: action.payload.FavoriteProducts,
          favoritedProductsById: favoritedProductsById
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
