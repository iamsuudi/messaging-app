import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { UserType } from "../types";
import User from "../models/user";

passport.serializeUser((user, done) => {
    const parsed = user as UserType;
	done(null, parsed.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
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
				const user: UserType | null = await User.findOne({ email });
				if (!user) return done(null, false);

				const passwordCorrect = user.passwordHash
					? bcrypt.compare(password, user.passwordHash)
					: false;
				if (!passwordCorrect) return done(null, false);

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);
