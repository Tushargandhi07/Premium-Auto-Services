const mongoose= require("mongoose");

const connection= mongoose.connect("mongodb+srv://tushar:tushar@cluster0.ywnxqtb.mongodb.net/project?retryWrites=true&w=majority");

module.exports={
    connection
}