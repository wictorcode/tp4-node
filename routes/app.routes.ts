import express, { Router } from "express"
import { AuthController } from "../controllers/auth.controller"

export const appRouter = Router()


//== V1 ==//

appRouter.get("/", (req, res) => {
    AuthController.test()
    res.send("Hello World")
})

appRouter.post("/signup", (req, res) => {
    res.send("/signup")
})

appRouter.post("/login", (req, res) => {
    res.send("/login")
})