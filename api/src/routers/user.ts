import express, { Request, Response } from "express";
import passport from "passport";
import { register, searchUsers, updateProfile } from "../controllers/user";
import { authenticated } from "../middlewares/authenticated";
import { upload } from "../middlewares/profileUpload";
import User from "../models/user";

const userRouter = express.Router();

userRouter.post(
	"/auth/login",
	passport.authenticate("local"),
	(req: Request, res: Response) => {
		// if (req.user) setupSocket(req.user.id);
		res.status(200).json(req.user);
	}
);

userRouter.post(
	"/auth/register",
	register,
	passport.authenticate("local"),
	(req, res) => {
		res.status(201).json(req.user);
	}
);

userRouter.post("/auth/logout", async (req: Request, res: Response) => {
	if (!req.user) return res.sendStatus(401);

	req.logout((error) => {
		if (error) return res.sendStatus(400);
		res.sendStatus(200);
	});
});

userRouter.post("/updateMe", authenticated, updateProfile);

userRouter.post(
	"/updateMe/pic",
	authenticated,
	upload,
	async (req: Request, res: Response) => {
		const user = await User.findByIdAndUpdate(
			req.user?.id,
			{
				picture: req.file?.filename,
			},
			{ new: true }
		);
		res.status(201).json(user);
	}
);

userRouter.get("/searchUsers/:query", authenticated, searchUsers);

export default userRouter;
