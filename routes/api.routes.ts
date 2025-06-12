import express, { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import path from "path"

export const apiRouter = Router()

const basePath = path.join(__dirname, "../pages")
//== V1 ==//

apiRouter.get("/", (req, res) => {
    res.sendFile(path.join(basePath, "login.html"))
})

apiRouter.post("/signup", (req, res) => {
    AuthController.signup(req, res)
})

apiRouter.post("/login", (req, res) => {
    AuthController.login(req, res)
})