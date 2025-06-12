import { Request, Response, NextFunction } from "express";

const roleHierarchy = {
  user: 1,
  moderator: 2,
  admin: 3,
}

export function checkRole(minimumRole: keyof typeof roleHierarchy) {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userRole = req.user?.role

    // @ts-ignore
    if (!userRole || roleHierarchy[userRole] < roleHierarchy[minimumRole]) {
      return res.status(403).json({ message: "Accès interdit" })
    }

    next()
  }
}
