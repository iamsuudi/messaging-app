// import { Server, Socket } from "socket.io";

// const onlineUsers: Set<string> = new Set();

// export const userSocketHandlers = (io: Server, socket: Socket) => {
// 	socket.on("signIn", (userId: string) => {
// 		onlineUsers.add(userId);
// 		io.emit("userOnline", userId);
// 		console.log(`User ${userId} is online`);
// 	});

// 	socket.on("disconnect", () => {
// 		// Assuming userId is stored in socket session
// 		const userId = socket.data.userId;
// 		if (userId) {
// 			onlineUsers.delete(userId);
// 			io.emit("userOffline", userId);
// 			console.log(`User ${userId} is offline`);
// 		}
// 	});

// 	socket.on("setUserId", (userId: string) => {
// 		socket.data.userId = userId;
// 	});
// };
