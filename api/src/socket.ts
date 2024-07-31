import { Socket } from "socket.io";
import { io } from "./app";
// import { userSocketHandlers } from "./middlewares/socketHandlers/userHandler";
// import { userSocketHandlers } from './socketHandlers/userHandlers';
// import { chatSocketHandlers } from './socketHandlers/chatHandlers';

export const onlineUsers: { [key: string]: Socket } = {};

export const setupSocket = (myId: string) => {
	io.on("connection", (socket: Socket) => {
		// console.log('connection root');

		// console.log(socket.listeners);
		console.log(`${myId} is online. socketId ${socket.id}`);

		onlineUsers[myId] = socket;

		// Attach user handlers
		// userSocketHandlers(io, socket);

		// // Attach chat handlers
		// chatSocketHandlers(io, socket);

		socket.on("disconnect", () => {
			// console.log('connection root');

			console.log(`${myId} is offline`);
			delete onlineUsers[myId];
		});
	});
};
