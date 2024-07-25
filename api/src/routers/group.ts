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

const groupRouter = express.Router();

groupRouter.post("/chat/group", createGroupChat);
groupRouter.post("/chat/group/:groupId", makeGroupChat);
groupRouter.get("/chat/group/:groupId", getGroupChat);
groupRouter.get("/chat/group", getGroupChats);
groupRouter.put("/chat/group/:groupId", editGroupChat);
groupRouter.delete("/chat/group/:groupId", deleteGroupChat);
groupRouter.delete("/chat/group/:groupId/message", deleteMessage);

export default groupRouter;
