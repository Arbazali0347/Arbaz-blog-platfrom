import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComment, getDashboard } from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);
adminRoute.get("/comments",auth, getAllComment);
adminRoute.get("/blogs",auth, getAllBlogsAdmin);
adminRoute.post("/delete-comment",auth, deleteCommentById); 
adminRoute.post("/approve-comment",auth, approveCommentById); 
adminRoute.get("/dashboard",auth, getDashboard); 


export default adminRoute;