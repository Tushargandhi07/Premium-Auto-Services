const mongoose= require("mongoose");

const productSchema= mongoose.Schema({
    image:String,
    price:String,
    description:String,
    name:String,
    warranty:String
});

const ProductModel= mongoose.model("product",productSchema);

module.exports={
    ProductModel
}