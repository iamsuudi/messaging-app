import { Request, Response } from "express";

export default function unKnowEndpointHandler(req: Request, res: Response) {
	res.status(400).json({ message: "Unknown endpoint" });
}
