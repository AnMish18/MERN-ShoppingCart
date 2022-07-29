import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {url,setHeaders} from './api'
import { toast } from "react-toastify";
const initialState={
    items:[],
    status:null,
    error:null,
    createStatus:null
};
export const productsFetch=createAsyncThunk(
    "products/productsFetch",
    async ()=>{
        try{
            const response =await axios.get("http://localhost:5000/products")
            // const response =await axios.get(`${url}/products`)
            return response.data               //error if no particular data 
        }catch(err){
            console.log(err);
        }
    }
)

export const productsCreate=createAsyncThunk(
    "products/productsCreate",
    async (values)=>{                       //represents an object whenever the form is submitted
        try{
            const response =await axios.post(`${url}/products`,values, setHeaders())
            return response.data               //error if no particular data 
        }catch(err){
            console.log(err);
            toast.error(err.response?.data)
        }
    }
)

const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},      //reducers generate action creator and handle state
    extraReducers:{   //only handle the action type not handle state. used when action creater is defined productsFetch 
        [productsFetch.pending]:(state,action)=>{
            state.status="pending"   //imitates the state
        },
        [productsFetch.fulfilled]:(state,action)=>{
            state.status="success"   
            state.items=action.payload
        },
        [productsFetch.rejected]:(state,action)=>{
            state.status="rejected";
            state.error=action.payload
        },
        [productsCreate.pending]:(state,action)=>{
            state.createStatus="pending"   //imitates the state
        },
        [productsCreate.fulfilled]:(state,action)=>{
            state.items.push(action.payload);
            state.createStatus="success";
            toast.success("Product created successfully");   
            
        },
        [productsCreate.rejected]:(state,action)=>{
            state.createStatus="rejected";
            // state.error=action.payload
        }
    }
})
export default productsSlice.reducer;