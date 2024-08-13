import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const url = window.location.protocol === "http:" ? "http://localhost:3001" : "";

export const socket: Socket = io(url);

const useSocket = (): Socket | undefined => {
	const socketRef = useRef<Socket>();

	// Connect to the server
	socketRef.current = socket;

	useEffect(() => {
		return () => {
			// Clean up the socket connection on component unmount
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);

	return socketRef.current;
};

export default useSocket;
