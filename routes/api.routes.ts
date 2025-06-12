// @ts-nocheck
import express, { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import path from "path"
import { verifyToken } from "../middlewares/auth.middleware"
import { checkRole } from "../middlewares/check-role.middleware"
import { UserModel } from "../models/user.model"
import { UserController } from "../controllers/user.controller"
import { 
    filterTours, 
    getMonthlyPlan, 
    getToursStats, 
    getAllToursController, 
    aliasTopTours, 
    getTourByIdController, 
    createTour, 
    updateTourController, 
    checkBody, 
    deleteTour } 
from '../controllers/tour.controller'

export const apiRouter = Router()

const basePath = path.join(__dirname, "../pages")

//== V1 ==//

apiRouter.post("/signup", AuthController.signup)

apiRouter.post("/login", AuthController.login)

apiRouter.get("/users", verifyToken, checkRole("moderator"), UserController.getAllUsers)
apiRouter.get("/users/:id", verifyToken, checkRole("admin"), UserController.getUserById);
apiRouter.delete("/users/:id", verifyToken, checkRole("admin"), UserController.deleteUser);
// apiRouter.patch("/users/:id", verifyToken, checkRole("admin"), )





apiRouter.route('/tours/top-5-cheap')
    .get(aliasTopTours, getAllToursController)

apiRouter
    .route('/tours')
    .get(getAllToursController)
    .post(createTour)

apiRouter.route('/tours/tour-stats').get(getToursStats)
apiRouter.route('/tours/monthly-plan/:year').get(getMonthlyPlan)
apiRouter.route('/tours/filter').get(filterTours)
apiRouter
    .route('/tours/:id')
    .get(getTourByIdController)
    .put(updateTourController)
    .delete(deleteTour)