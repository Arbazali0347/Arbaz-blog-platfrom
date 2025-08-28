import express from "express"
import "dotenv/config"
import cors from "cors"
import ConnectDB from "./config/db.js";
import adminRoute from "./config/routes/adminRoute.js";
import blogRouter from "./config/routes/blogRouter.js";
import { ChatController } from "./config/controllers/ChatController.js";

const app = express();

await ConnectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req, res)=> {
    res.send("API is working")
})

app.post("/chat", ChatController)
app.use("/api/admin", adminRoute)
app.use("/api/blog", blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is runing on PORT " + PORT)
})