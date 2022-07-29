const express=require('express');
const { Product } = require('../models/product');
const router= express.Router();
const cloudinary=require('../utils/cloudinary');

//Creation of prodict
router.post("/",async(req,res)=>{

    const {name,brand,desc,price,image}=req.body;
    try{
        if(image){
            const uploadRes=await cloudinary.uploader.upload(image,{
                upload_preset:"onlineShop"
            })
            if(uploadRes){
                const product=new Product({
                    name,
                    brand,
                    desc,
                    price,
                    image:uploadRes,
                })
                const savedProduct=await product.save()
                res.status(200).send(savedProduct)
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

router.get("/",async(req,res)=>{
    try{
    const products=await Product.find()     //get products in the database from cloudinary
    res.status(200).send(products);
    }catch(err){
        console.log(error);
        res.status(500).send(error);    
    }
})
module.exports=router;