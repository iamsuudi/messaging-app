import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
<<<<<<< HEAD
import UserModel from "../models/user";
=======
import UserModel, { UserType } from "../models/user";
>>>>>>> 95abc5f (fix: Add user type on the serialize function)

passport.serializeUser((user: UserType, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await UserModel.findById(id);
<<<<<<< HEAD
		const parsed = user?.toJSON() as Express.User;
=======
		const parsed = user?.toJSON() as UserType;
>>>>>>> 95abc5f (fix: Add user type on the serialize function)
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
				const user = await UserModel.findOne({ email });
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
