import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import creteUser from "./routes/UserRoutes.js"
import loginUser from "./routes/UserRoutes.js"
dotenv.config()
const PORT = process.env.PORT
const app = express()
connectDB()
app.use(cors())
app.use(express.json())

app.use("/api",creteUser)
app.use("/api",loginUser)
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})


