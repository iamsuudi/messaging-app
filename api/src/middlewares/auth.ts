import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import bcrypt from "bcrypt";
import UserModel from "../models/user";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/config";

passport.serializeUser((user: Express.User, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await UserModel.findById(id);
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

/* eslint prefer-arrow-callback: 0 camelcase: 0 */
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string,
			callbackURL: "https://dalochat.onrender.com/api/auth/google/redirect",
		},
		async function verify(
			accessToken,
			refreshToken,
			profile,
			done: Function
		) {
			try {
				// Get user's email from profile

				const { email, displayName: name, picture } = profile;

				let user = await UserModel.findOne({ email });

				if (!user) {
					user = new UserModel({
						name,
						email,
						picture,
					});
					await user.save();
				}

				done(null, user.toJSON());
			} catch (err) {
				done(err, null);
			}
		}
	)
);
