import express from "express";
import {
    createIndividualChat,
	deleteIndividualChat,
	deleteMessage,
	getIndividualChat,
	getIndividualChats,
	makeIndividualChat,
} from "../controllers/chat";

const chatRouter = express.Router();

chatRouter.post("chat/individual", createIndividualChat);
chatRouter.post("chat/individual/:chatId", makeIndividualChat);
chatRouter.get("chat/individual/:chatId", getIndividualChat);
chatRouter.get("chat/individual", getIndividualChats);
chatRouter.put("chat/individual/:chatId", getIndividualChats);
chatRouter.delete("chat/individual/:chatId", deleteIndividualChat);
chatRouter.delete("chat/individual/:chatId/message", deleteMessage);

export default chatRouter;
