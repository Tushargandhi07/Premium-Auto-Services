const {UserModel}= require("../models/user.model");

const checkUser= async (req,res,next)=>{
    const {email} = req.body;
    try {
        const user= await UserModel.find({email});
        if(user.length>0){
            res.send({"msg":"Email Already registered."});
            console.log("Email Already registered.")
        }
        else{
            next();
        }
    } catch (err) {
        console.log(err);
    }
    
}

module.exports={
    checkUser
}