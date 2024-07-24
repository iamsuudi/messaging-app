import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user";

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id) as unknown as Express.User;
		done(null, user);
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
				if (!user) return done(null, false);

				const passwordCorrect = user.passwordHash
					? bcrypt.compare(password, user.passwordHash)
					: false;
				if (!passwordCorrect) return done(null, false);

				return done(null, user.toJSON());
			} catch (error) {
				return done(error);
			}
		}
	)
);
