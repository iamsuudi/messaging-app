import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import morgan from "morgan";
import { clientURL, MONGODB_URI, SECRET, SECURE } from "./utils/config";
import "express-async-errors";
import "./middlewares/auth";

import unKnowEndpointHandler from "./middlewares/unKnowEndpoint";
import errrorHandler from "./middlewares/errrorHandler";
import userRouter from "./routers/user";
import chatRouter from "./routers/chat";
import groupRouter from "./routers/group";

import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";

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

// socket setup
const app = express();

app.use(
	cors({
		origin: clientURL,
		credentials: true,
	})
);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
	cors: { origin: clientURL },
	connectionStateRecovery: {},
});

setupSocket("someone");

app.use(express.json());

app.use(express.static("public"));

app.use(morgan("dev"));

app.use(
	session({
		secret: SECRET as string,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60,
			sameSite: "none",
			secure: SECURE,
		},
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
		}),
	})
);
app.use(passport.session());

app.use(passport.authenticate("session"));

app.use(express.urlencoded({ extended: false }));

app.use("/api", userRouter, chatRouter, groupRouter);

app.get("/api/me", (req, res) => {
	if (req.user) {
		res.status(200).json(req.user);
	} else {
		res.status(401).json({ message: "Not authenticated" });
	}
});

app.use(unKnowEndpointHandler);

app.use(errrorHandler);

export default httpServer;
