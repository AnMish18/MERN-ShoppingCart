import './App.css';
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import NavBar from './components/NavBar.jsx';
import Cart from './components/Cart.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound'; 
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard'
import Products from './components/admin/Products'
import Summary from './components/admin/Summary'
import CreateProduct from './components/admin/CreateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
      <NavBar/>
      <Routes>          {/*load specific path*/}
     
          <Route  path= "/cart" exact element={<Cart/>} />  
          <Route  path="/not-found" element={<NotFound/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Dashboard/>}>
               <Route path="products" element={<Products/>}>
               <Route path="create-product" element={<CreateProduct/>}/>
                 </Route>
               <Route path="summary" element={<Summary/>}/>
            </Route>
          <Route  path= "/" exact element={<Home/>} />     
          <Route to="/not-found"/>
      </Routes>                                              
      </BrowserRouter>
    </div>
  );
}

export default App;

