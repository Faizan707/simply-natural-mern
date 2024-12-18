import express from "express"
import upload from "../config/multer.js"
import  { createUser,LoginUser } from "../controllers/User.controller.js"
const router = express.Router()

router.post("/register",upload.single("image"),createUser)
router.post("/login",LoginUser)

export default router