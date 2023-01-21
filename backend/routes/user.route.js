const express= require("express");
const {UserModel}= require("../models/user.model");
const {checkUser}= require("../middlewares/checkuser.middleware")
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const userRouter= express.Router();


userRouter.post("/login",async(req,res)=>{
    const {email,pass}= req.body;
    try {
        const user = await UserModel.find({email});
           
        if(user.length>0){
            const hashed_password= user[0].pass;
            bcrypt.compare(pass, hashed_password, (err, result)=> {
                if(result){
                    const token= jwt.sign({userID:user[0]._id},'masai');
                    res.send({"msg":"Login Done","token":token,"username":user[0].name,"userID":user[0]._id})
                }else{
                    res.send({"msg":"Wrong Credentials"});
                }
            });    
        }
        else{
            res.send({"msg":"Wrong Credentials"});
        }
    } catch (err) {
        console.log("Error while logged in.");
        console.log(err);
        res.send({"msg":"Error while logged in."})
    }
});

userRouter.get("/all",async(req,res)=>{
    try {
        let data = await UserModel.find();
        res.send(data);
    } catch (err) {
        console.log("Something went wrong while getting the data")
        console.log(err);
        res.send({"msg":"Error while getting the data"})
    }
})





userRouter.use(checkUser);

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age,mobile}= req.body;
    try {
        bcrypt.hash(pass, 5, async(err, secure_password)=> {
            if(err){
                console.log(err);
            }
            else{
                const user = new UserModel({name,email,pass:secure_password,age,mobile});
                await user.save();
                res.send({"msg":"Registered"});
            }
        });
    } catch (err) {
        console.log("Error while register the data.");
        console.log(err);
        res.send({"msg":"Error while register the data."});
    }
});








module.exports={
    userRouter
}