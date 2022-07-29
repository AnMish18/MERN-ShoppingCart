import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi=createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000"    //baseurl is added
    }),
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:()=>"products",        //endpoints are specified
        })
    })   
})

export const { useGetAllProductsQuery}=productsApi