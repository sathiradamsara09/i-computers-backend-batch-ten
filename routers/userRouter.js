import express from "express";
import { createUser, loginUser, getUserData, updateUserData, changePassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/me", getUserData)
userRouter.put("/", updateUserData)
userRouter.put("/password", changePassword)

export default userRouter;