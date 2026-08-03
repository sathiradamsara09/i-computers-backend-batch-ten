import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const mongodbURI = process.env.MONGO_URI;



mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("Connected to MongoDB");
    }
)
app.use(cors())


app.use(express.json())

app.use(authenticateUser)



app.use("/api/users", userRouter)
app.use("/api/products", productRouter) 


app.put("/", (req,res)=>{
    console.log(req);
    console.log("Put Request Received");
})

app.delete("/", (req,res)=>{
    console.log(req);   
    console.log("Delete Request Received");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

