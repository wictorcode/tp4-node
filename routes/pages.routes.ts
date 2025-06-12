import express, { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import path from "path"
import { verifyToken } from "../middlewares/auth.middleware"
import { checkRole } from "../middlewares/check-role.middleware"

export const pageRouter = Router()

const basePath = path.join(__dirname, "../pages")
//== V1 ==//

pageRouter.get("/signup", (req, res) => {
    res.sendFile(path.join(basePath, "signup/signup.html"))
})

pageRouter.get("/login", (req, res) => {
    res.sendFile(path.join(basePath, "login/login.html"))
})

//@ts-ignore
pageRouter.get("/user-management", (req, res) => {
    res.sendFile(path.join(basePath, "user-view/user-view.html"))
})