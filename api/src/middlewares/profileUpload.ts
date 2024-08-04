import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req: Request, file, cb) {
		cb(null, "public");
	},
	filename: function (req: Request<{ groupId: string }>, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({ storage: storage }).single("picture");
