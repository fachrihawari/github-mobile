import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { createFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import authReducer from './auth/reducer';
import repositoryReducer from './repository/reducer';
import rootSaga from './saga';

// combine all reducer
const rootReducer = combineReducers({
  auth: authReducer,
  repository: repositoryReducer
});

// create redux-saga middleware
const sagaMiddleware = createSagaMiddleware();

// setup redux-persist middleware
const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  blacklist: ['repository'],
  transforms: [
    createFilter('auth', [
      'isLoggedIn', 'user'
    ])
  ]
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

// persistor.flush()
// persistor.purge()
// persistor.persist()

sagaMiddleware.run(rootSaga);
