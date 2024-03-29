import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from './session';
import productSlice from './product';
import collectionSlice from './collection';
import favoriteProductSlice from './favoriteProduct';
import favoriteCollectionSlice from './favoriteCollection';
// import logger from 'redux-logger'


export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    products: productSlice.reducer,
    collections: collectionSlice.reducer,
    favoriteProducts: favoriteProductSlice.reducer,
    favoriteCollections: favoriteCollectionSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;


// import {
//   legacy_createStore as createStore,
//   applyMiddleware,
//   compose,
//   combineReducers,
// } from "redux";
// import thunk from "redux-thunk";
// import sessionReducer from "./session";
// import productReducer from "./product";
// import collectionReducer from "./collection";
// import favoriteReducer from "./favorite";

// const rootReducer = combineReducers({
//   session: sessionReducer,
//   product: productReducer,
//   collection: collectionReducer,
//   favorite: favoriteReducer
// });

// let enhancer;
// if (import.meta.env.MODE === "production") {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = (await import("redux-logger")).default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;