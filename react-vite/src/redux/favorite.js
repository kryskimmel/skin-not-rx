const GET_FAVORITE_PRODUCT = 'favorite/GET_FAVORITE_PRODUCT';
const ADD_FAVORITE_PRODUCT = 'favorite/ADD_FAVORITE_PRODUCT';
const DELETE_FAVORITE_PRODUCT = 'favorite/DELETE_FAVORITE_PRODUCT';

const GET_FAVORITE_COLLECTION = 'favorite/GET_FAVORITE_COLLECTION';
const ADD_FAVORITE_COLLECTION = 'favorite/ADD_FAVORITE_COLLECTION';
const DELETE_FAVORITE_COLLECTION = 'favorite/DELETE_FAVORITE_COLLECTION';


const getFavoriteProduct = () => ({
  type: GET_FAVORITE_PRODUCT,
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

const getFavoriteCollection = () => ({
    type: GET_FAVORITE_COLLECTION,
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
