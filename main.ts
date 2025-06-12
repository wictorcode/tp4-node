import express from "express"
import mongoose from "mongoose"
import { apiRouter } from "./routes/api.routes"
import { UserModel } from "./models/user.model"
import dotenv from "dotenv"
import path from "path"
import { pageRouter } from "./routes/pages.routes"

const app = express()
app.use(express.json())
dotenv.config();


// CONSTANTS //

const mongoUri: string = process.env.MONGO_URI as string
const port: number = parseInt(process.env.PORT as string)

app.use(express.static(path.join(__dirname, "./public")))

function connectToMongoDB() {
    mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!")
        startPortListening()
    })
    .catch(() => {
        console.log("Connection to MongoDB has failed")
    })
}

function setupRouters() {
    app.use("/api", apiRouter)
    app.use("/pages", pageRouter)
}


function startPortListening() {
    
    setupRouters()
    
    app.listen(port, () => {
        console.log(`App running on port ${port}`);
    })
}



connectToMongoDB()