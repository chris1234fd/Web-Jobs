import express from "express"
import { login, logout, registro, updateProfile } from "../controllers/user.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
//import isAuthenticated from "../middlewares/isAuthenticated.js"

//import { login, register, updateProfile } from "../controllers/User_controller.js"
//import isAuthenticated from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.post("/register" , registro )
//router.route("/register").post(register)
router.post("/login" , login)
//router.route("/login").post(login)
router.get("/logout" , logout)
//router.route("/profile/update").post(isAuthenticated ,updateProfile)
router.post( "/profile/update" ,isAuthenticated , updateProfile)


export default router
 