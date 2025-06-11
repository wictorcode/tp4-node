import express from "express"
import mongoose from "mongoose"
import { appRouter } from "./routes/app.routes"
import { UserModel } from "./models/user.model"

const connectString ="mongodb+srv://vautrinvic:nSaPwmhqsCTVLG18@clustertp4.c3p2o2w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTP4"

const app = express()
app.use(express.json())



function connectToMongoDB() {
    mongoose.connect(connectString)
    .then(() => {
        console.log("Connection to MongoDB has succeeded !!")
        startPortListening()
    })
    .catch(() => {
        console.log("Connection to MongoDB has failed")
    })
}

function setupRouters() {
    app.use("/", appRouter)
}


async function startPortListening() {
    
    setupRouters()
    
    const port = 3000
    app.listen(port, () => {
        console.log(`App running on port ${port}`);
    })

    const nouvelUtilisateur = new UserModel({
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        password: "motdepasse123",
        role: "user"
    });

    await nouvelUtilisateur.save();
    console.log("Utilisateur crée :", nouvelUtilisateur);
    


}


connectToMongoDB()