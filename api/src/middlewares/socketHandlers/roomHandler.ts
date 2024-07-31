import { io } from "../../app";

export function joinRoom(room: string) {
	io.on("connection", (socket) => {
		socket.join(room);
		socket.on("disconnect", () => {
			socket.leave(room);
		});
	});
}
