import "dotenv/config";

export const { PORT, MONGODB_URI, SECRET, SALT } = process.env;

export const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
	process.env;

export const clientURL =
	process.env.NODE_ENV === "production"
		? "https://dalochat.vercel.app"
		: "http://localhost:5173";

export const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
