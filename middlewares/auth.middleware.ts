import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}
