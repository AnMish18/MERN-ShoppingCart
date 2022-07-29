import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import {configureStore} from '@reduxjs/toolkit';   //import a provider component from redux
import {Provider} from 'react-redux';
import productReducer, { productsFetch } from './features/productSlice';
import { productsApi } from './features/productsApi';
import CartReducer, { getTotals } from './features/CartSlice';
import authReducer, { loadUser } from './features/authSlice';
const store=configureStore({                //combines different reduces are auutomaticallt configure redux tools
  reducer:{
    products:productReducer,     //combine different reduces for the store
    cart:CartReducer ,   //our cart clice is a reducer
    auth:authReducer,
    [productsApi.reducerPath]:productsApi.reducer,
  } ,
  middleware:(getDefaultMiddleware)=>
     getDefaultMiddleware().concat(productsApi.middleware)
                                
})
const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(productsFetch())     //dispatch the action creater and asyncthunk fetch or returns data as payload
// store.dispatch(getTotals()) 
store.dispatch(loadUser(null))
root.render(
  <React.StrictMode>
    <Provider store={store}>                     { /*store acts as a central interface */}
    <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


