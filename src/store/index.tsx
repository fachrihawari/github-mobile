import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "./saga";
import authReducer from "./auth/reducer";

// combine all reducer
const rootReducer = combineReducers({
  auth: authReducer
});

// create redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

// setup redux-persist middleware
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Defince all redux middleware
const middlewares = [sagaMiddleware];

// Connect to redux-remove-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// Export for Provider
export const store = createStore(persistedReducer, enhancer);

// Export persistore for PersistGate component
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
