const express=require("express");
const {ProductModel}= require("../models/product.model");
const {obj}= require("../data");

const productRouter= express.Router();
productRouter.use(express.json());

productRouter.get("/get",(req,res)=>{
    res.send("data");
});

productRouter.post("/create",async(req,res)=>{
    const payload= req.body;
    try {
        const product = new ProductModel(payload);
        await product.save();
        res.send({"msg":"Product post."});
    } catch (err) {
        console.log("Something went wrong");
        console.log(err);
        res.send({"msg":"Something went wrong while post the product." });
    }
});

productRouter.get("/all",async(req,res)=>{
    let {description}=req.query;
    const page= Number(req.query.page) || 1;
    const limit= Number(req.query.limit) || 9;
    const skips= (page-1) * limit;
    let query={};
    if(description){
        query.description = {$regex:description, $options:"i"}
    }
    try {
        // const data= await ProductModel.find(query).sort({"name": -1}).skip(skips).limit(limit);;
        const data= await ProductModel.find(query);
        res.send(data);
    } catch (err) {
        console.log("Something went wrong");
        console.log(err);
        res.send({"msg":"Something went wrong while fetching the products." })
    }
});

productRouter.delete("/delete/:id", async (req, res) => {
    //verify token
    const ID = req.params.id;
    try {
        await ProductModel.findByIdAndDelete({ _id: ID });
        console.log("Item Deleted from database");
        res.send({"msg":"Deleted"});
    } catch (err) {
        res.send({ "msg": "Something went wrong" })
    }
});


productRouter.patch("/update/:id", async (req, res) => {
    //verify token
    let payload= req.body;
    const ID = req.params.id;
    try {
        await ProductModel.findByIdAndUpdate({ _id: ID },payload);
        console.log("Item Updated from database");
        res.send({"msg":"Updated"});
    } catch (err) {
        res.send({ "msg": "Something went wrong" })
    }
});




// productRouter.post("/createmany",async(req,res)=>{
//     try {
//         await ProductModel.insertMany(obj.data);
//         res.send({"msg":" All Product post."});
//     } catch (err) {
//         console.log("Something went wrong");
//         console.log(err);
//         res.send({"msg":"Something went wrong while post the product." })
//     }
// });


module.exports={
    productRouter
}