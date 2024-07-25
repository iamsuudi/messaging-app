import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user";

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		const parsed = user?.toJSON() as Express.User;
		done(null, parsed);
	} catch (error) {
		done(error);
	}
});

passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email: string, password: string, done: Function) => {
			try {
				const user = await User.findOne({ email });
				if (!user) throw new Error("User doesn't exist");

				const passwordCorrect = user.passwordHash
					? await bcrypt.compare(password, user.passwordHash)
					: false;

				if (!passwordCorrect) throw new Error("Incorrect password");

				return done(null, user.toJSON());
			} catch (error) {
				return done(error);
			}
		}
	)
);
