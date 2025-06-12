import { UserModel } from "../models/user.model"
import bcrypt from "bcrypt"
import express from "express"
import { Request, Response } from "express";

export const AuthController = {
    async signup(req: Request, res: Response) {
    try {
            const { name, email, password, role } = req.body;

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
    }
}