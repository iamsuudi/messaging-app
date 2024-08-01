import { Socket } from "socket.io";
import { io } from "./app";

export const onlineUsers: { [key: string]: Socket } = {};

export const createdSockets: { [key: string]: Socket } = {};

export const rooms: { [key: string]: string[] } = {};

export const setupSocket = (myId: string) => {
	io.on("connection", (socket: Socket) => {
		console.log(`${myId} is online. socketId ${socket.id}`);

		createdSockets[socket.id] = socket;

		socket.on("joinChat", (chatId: string, hello: string) => {
			socket.join(chatId);
			console.log(`socket ${socket.id} joined chat ${chatId}`);
		});

		socket.on("disconnect", () => {
			console.log(`${myId} is offline`);
			delete createdSockets[myId];
		});
	});
};
