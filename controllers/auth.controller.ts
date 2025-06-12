import { UserModel } from "../models/user.model"
import bcrypt from "bcrypt"
import express from "express"
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"

export const AuthController = {
    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body; // On ignore le rôle, tout le monde est user au début

            // Hash le MDP
            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new UserModel({
                name: name,
                email: email,
                password: hashedPassword,
                role: "user"
            })

            const savedUser = await newUser.save()

            res.status(201).json({ message: "User created", user: savedUser });
        } catch (error) {
                res.status(500).json({ error: "Internal server error" });
        }
    },






    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body; // On ignore le rôle, tout le monde est user au début

            const user = await UserModel.findOne({ email });
            if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });
            const token = jsonwebtoken.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '24h' }
            );
            res.json({ userId: user._id, role: user.role, token });
        } catch (error) {
                res.status(500).json({ error: "Internal server error" });
        }
    }
}