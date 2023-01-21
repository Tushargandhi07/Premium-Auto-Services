const express= require("express");
const {connection}= require("./configs/db");
const {productRouter} = require("./routes/product.route");
const {userRouter} = require("./routes/user.route");
const {cartRouter} = require("./routes/cart.route");
const {authenticate}= require("./middlewares/authenticate.middleware");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port= 4440;

app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.use("/users",userRouter);
app.use("/products",productRouter);

app.use(authenticate);
app.use("/cart",cartRouter);


app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Something went wrong while connect to DB.");
        console.log(error)
    }
    console.log("Server is running.")
});
