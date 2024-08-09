import express, { Request, Response } from "express";
import {
	addUser,
	createGroupChat,
	deleteGroupChat,
	deleteMessage,
	editGroupChat,
	getGroupChat,
	getGroupChats,
	makeGroupChat,
	removeUser,
} from "../controllers/group";
import { authenticated } from "../middlewares/authenticated";
import { upload } from "../middlewares/profileUpload";
import Group from "../models/group";

const groupRouter = express.Router();

groupRouter.post("/chat/group", authenticated, createGroupChat);
groupRouter.post("/chat/group/:groupId", authenticated, makeGroupChat);
groupRouter.get("/chat/group/:groupId", authenticated, getGroupChat);
groupRouter.get("/chat/group", authenticated, getGroupChats);
groupRouter.put("/chat/group/:groupId", authenticated, editGroupChat);
groupRouter.delete("/chat/group/:groupId", authenticated, deleteGroupChat);
groupRouter.delete("/chat/group/:groupId/user", authenticated, removeUser);
groupRouter.post("/chat/group/:groupId/user", authenticated, addUser);
groupRouter.delete(
	"/chat/group/:groupId/message",
	authenticated,
	deleteMessage
);
groupRouter.post(
	"/chat/group/:groupId/updateProfilePic",
	authenticated,
	upload,
	async (req: Request<{ groupId: string }>, res: Response) => {
		console.log(req?.file);
		
		const group = await Group.findByIdAndUpdate(
			req.params.groupId,
			{
				picture: req.file?.path,
			},
			{ new: true }
		);
		res.status(201).json(group);
	}
);

export default groupRouter;
