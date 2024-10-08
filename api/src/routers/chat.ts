import express from "express";
import {
	clearIndividualChat,
	createIndividualChat,
	deleteIndividualChat,
	deleteMessage,
	getIndividualChat,
	getIndividualChats,
	getMyContacts,
	makeIndividualChat,
	seeMessage,
} from "../controllers/chat";
import { authenticated } from "../middlewares/authenticated";

const chatRouter = express.Router();

chatRouter.post("/chat/individual", authenticated, createIndividualChat);
chatRouter.post("/chat/individual/:chatId", authenticated, makeIndividualChat);
chatRouter.post("/chat/individual/:chatId/see", authenticated, seeMessage);
chatRouter.get("/chat/individual/:chatId", authenticated, getIndividualChat);
chatRouter.get("/chat/individual", authenticated, getIndividualChats);
chatRouter.put("/chat/individual/:chatId", authenticated, getIndividualChats);
chatRouter.delete(
	"/chat/individual/:chatId",
	authenticated,
	deleteIndividualChat
);
chatRouter.delete(
	"/chat/individual/:chatId/clear",
	authenticated,
	clearIndividualChat
);
chatRouter.delete(
	"/chat/individual/:chatId/message",
	authenticated,
	deleteMessage
);
chatRouter.get("/contacts", authenticated, getMyContacts);

export default chatRouter;
