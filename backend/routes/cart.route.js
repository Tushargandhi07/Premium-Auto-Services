const express = require("express");
const {CartModel } = require("../models/cart.model");
const cartRouter = express.Router();

cartRouter.get("/get/:id", async (req, res) => {
    //verify token
    let query=req.params.id
    try {
        const data = await CartModel.find({userID:query});
        console.log("Cart has been sent")
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"});
    }
});


cartRouter.post("/create", async (req, res) => {
    //verify token
    const payload = req.body;
    const {_id}= req.body;
    const{userID}= req.headers;

    const product= await CartModel.find({_id,userID});
    if(product.length>0){
        res.send({ "msg": "Something went wrong" })
    }
    else{
    
    try {
        const new_note = new CartModel(payload);
        await new_note.save();
        res.send({"msg":"Item added to Cart."});
    } catch (error) {
        console.log(error);
        res.send({ "msg": "Something went wrong" });
    }
}
});

cartRouter.patch("/update/:id", async (req, res) => {
    //verify token
    const payload = req.body;
    const ID = req.params.id;
    const note = await CartModel.findOne({ _id: ID });
    const userID_in_note = note.userID;

    const userID_making_req = req.body.userID;


    
    try {
        if (userID_in_note !== userID_making_req) {
            res.send({ "msg": "You are not authorized" })
        }
        else {
            await CartModel.findByIdAndUpdate({ _id: ID }, payload);
            console.log("Cart has Updated.");
            res.send({ "msg": "Updated" });
        }
    } catch (error) {
        res.send({ "msg": "Something went wrong" });
    }
});


cartRouter.delete("/delete/:id", async (req, res) => {
    //verify token
    const ID = req.params.id;
    try {
        await CartModel.findByIdAndDelete({ _id: ID });
        console.log("Item Deleted from Cart");
        res.send("Deleted");
    } catch (err) {
        res.send({ "msg": "Something went wrong" })
    }
});


module.exports = {
    cartRouter
}