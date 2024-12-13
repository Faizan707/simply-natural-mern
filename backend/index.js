import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"

dotenv.config()
const PORT = process.env.PORT
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`)
})


