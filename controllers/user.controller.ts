import { UserModel } from "../models/user.model"
import bcrypt from "bcrypt"
import express from "express"
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"

export const UserController = {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserModel.find({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },


    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const deletedUser = await UserModel.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}