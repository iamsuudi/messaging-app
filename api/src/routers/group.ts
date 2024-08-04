import express, { Request, Response } from "express";
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
import { upload } from "../middlewares/profileUpload";
import Group from "../models/group";

const groupRouter = express.Router();

groupRouter.post("/chat/group", authenticated, createGroupChat);
groupRouter.post("/chat/group/:groupId", authenticated, makeGroupChat);
groupRouter.get("/chat/group/:groupId", authenticated, getGroupChat);
groupRouter.get("/chat/group", authenticated, getGroupChats);
groupRouter.put("/chat/group/:groupId", authenticated, editGroupChat);
groupRouter.delete("/chat/group/:groupId", authenticated, deleteGroupChat);
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
		const group = await Group.findByIdAndUpdate(
			req.params.groupId,
			{
				picture: req.file?.filename,
			},
			{ new: true }
		);
		res.status(201).json(group);
	}
);

export default groupRouter;
