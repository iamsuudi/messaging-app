import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_NAME,
	CLOUDINARY_API_SECRET,
} from "../utils/config";
import { Request } from "express";

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		// format: async (req: Request, file: Express.Multer.File) =>
		// 	path.extname(file.originalname).slice(1),
		public_id: (req: Request, file: Express.Multer.File) =>
			file.originalname.split(".")[0],
	},
});
