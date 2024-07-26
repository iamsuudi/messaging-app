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

	const user = await User.findOne({ email });

	if (!user) {
		const passwordHash = await bcrypt.hash(password, Number(SALT) || 10);

		await User.create({
			email,
			passwordHash,
		});
	} else {
		return res.status(400).json({ message: "Email is already taken!" });
	}

	next();
};

export const logout = async (req: Request, res: Response) => {
	if (!req.user) return res.sendStatus(401);
	req.logout((error) => {
		if (error) return res.sendStatus(400);
		res.sendStatus(200);
	});
};

export const updateProfile = async (
	req: Request<
		{},
		{},
		{ name: string; email: string; username: string; bios: string }
	>,
	res: Response
) => {
	const updatedData = req.body;

	const updatedUser = await User.findByIdAndUpdate(req.user?.id, updatedData);

	return res.status(202).json(updatedUser);
};

export const searchUsers = async (
	req: Request<{ query: string }>,
	res: Response
) => {
	const { query } = req.params;

	const users = await User.find({
		username: { $regex: query, $options: "i" },
	});

	return res.status(200).json(users);
};
