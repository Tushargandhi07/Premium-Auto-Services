const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    image:String,
    price:String,
    description:String,
    name:String,
    warranty:String,
    userID:String,
    quantity:String
});

const CartModel= mongoose.model("cart",cartSchema);

module.exports={
    CartModel
};