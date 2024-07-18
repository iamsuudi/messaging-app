import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import morgan from "morgan";
import { MONGODB_URI, SECRET } from "./utils/config";
import "express-async-errors";
import "./middlewares/auth";
import unKnowEndpointHandler from "./middlewares/unKnowEndpoint";
import errrorHandler from "./middlewares/errrorHandler";
import userRouter from "./routers/user";

mongoose.set("strictQuery", false);

console.log("connecting to mongodb");

mongoose
	.connect(MONGODB_URI as string)
	.then(() => {
		console.log("connected to mongodb");
	})
	.catch((error) => {
		console.error("error connecting to mongodb: ", error.message);
	});

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(morgan("dev"));
app.use(
	session({
		secret: SECRET as string,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
		}),
	})
);
app.use(passport.session());
app.use(passport.authenticate("session"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter);

app.get("/api/me", (req, res) =>
	req.user
		? res.status(200).json(req.user)
		: res.status(401).json({ message: "Not authenticated" })
);

app.use(unKnowEndpointHandler);
app.use(errrorHandler);

export default app;
