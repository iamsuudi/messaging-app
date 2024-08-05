import "dotenv/config";

export const { PORT, MONGODB_URI, SECRET, SALT } = process.env;

export const clientURL = process.env.NODE_ENV === 'production' ? 'https://dalochat.vercel.app' : 'http://localhost:5173'
