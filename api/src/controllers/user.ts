import { Request, Response } from "express";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";
import { SALT } from "../utils/config";

export const register = async (
	req: Request,
	res: Response,
	next: express.NextFunction
) => {
	const { password, email } = req.body;

	if (!password || !email)
		return res.status(402).json({ message: "Incorrent credentials" });
    
	const passwordHash = await bcrypt.hash(password, Number(SALT) || 10);

	await User.create({
		email,
		passwordHash,
	});

    next();
};
