import express from "express";
import passport from "passport";
import { register } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/auth/login", passport.authenticate("local"), (req, res) => {
	res.status(200).json(req.user);
});

userRouter.post(
	"/auth/register",
	register,
	passport.authenticate("local"),
	(req, res) => {
		res.status(201).json(req.user);
	}
);

export default userRouter;
