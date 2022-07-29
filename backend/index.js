const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const port=process.env.PORT || 5000   //if 5000 is not available some other port assigned
const app=express();
const products=require('./products');
const register = require('./routes/register')
const login = require('./routes/login')
const productsRoute= require('./routes/products')

require('dotenv').config();

app.use(express.json());
app.use(cors())    //access nodejs api from react app
app.use('/api/register', register);      //hit the particular endpoints from localhost
app.use('/api/login', login);  
app.use('/api/products', productsRoute)
app.get("/",(req,res)=>{ 
    res.send("Welcome to out shopping API");
});
app.get("/products",(req,res)=>{
    res.send(products);
});
const uri=process.env.DB_URI;
app.listen(port,console.log(`Server running at port  ${port}`));

mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=> console.log("MongoDb connection successful"))
.catch((err)=>console.log("Conection failed", err.message));