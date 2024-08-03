import express from "express";
import {
	createGroupChat,
	deleteGroupChat,
	deleteMessage,
	editGroupChat,
	getGroupChat,
	getGroupChats,
	makeGroupChat,
} from "../controllers/group";
import { authenticated } from "../middlewares/authenticated";

const groupRouter = express.Router();

groupRouter.post("/chat/group", authenticated, createGroupChat);
groupRouter.post("/chat/group/:groupId", authenticated, makeGroupChat);
groupRouter.post("/chat/group/:groupId/updateProfilePic", authenticated, makeGroupChat);
groupRouter.get("/chat/group/:groupId", authenticated, getGroupChat);
groupRouter.get("/chat/group", authenticated, getGroupChats);
groupRouter.put("/chat/group/:groupId", authenticated, editGroupChat);
groupRouter.delete("/chat/group/:groupId", authenticated, deleteGroupChat);
groupRouter.delete(
	"/chat/group/:groupId/message",
	authenticated,
	deleteMessage
);

export default groupRouter;
