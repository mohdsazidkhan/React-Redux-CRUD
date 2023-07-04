import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;