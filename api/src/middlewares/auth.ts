import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import UserModel, { UserType } from "../models/user";

passport.serializeUser((user: UserType, done) => {
	console.log("Serializing..");
	console.log(user);

	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log("Deserializing..");
	console.log({ id });

	try {
		const user = await UserModel.findById(id);
		const parsed = user?.toJSON() as UserType;
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
