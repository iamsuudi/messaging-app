import { NextFunction, Request, Response } from "express";

export function authenticated(req: Request, res: Response, next: NextFunction) {
	console.log("Authenticating...");
	console.log(req.session);

	if (req.user) next();
	else return res.status(401).json({ message: "Not Authenticated" });
}
