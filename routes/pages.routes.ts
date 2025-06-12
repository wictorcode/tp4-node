import express, { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import path from "path"

export const pageRouter = Router()

const basePath = path.join(__dirname, "../pages")
//== V1 ==//

pageRouter.get("/signup", (req, res) => {
    res.sendFile(path.join(basePath, "signup/signup.html"))
})

pageRouter.get("/login", (req, res) => {
    res.sendFile(path.join(basePath, "login/login.html"))
})