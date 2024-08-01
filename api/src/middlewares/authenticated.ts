import { NextFunction, Request, Response } from "express";

export function authenticated(req: Request, res: Response, next: NextFunction) {
	if (req.user) next();
	else return res.status(401).json({ message: "Not Authenticated" });
}
