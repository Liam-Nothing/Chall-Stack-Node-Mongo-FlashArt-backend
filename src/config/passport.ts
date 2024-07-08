import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import mongoose from "mongoose";
import User, { UserDocument } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "default_secret",
};

passport.use(
  new JwtStrategy(opts, (jwt_payload: any, done: any) => {
    User.findById(jwt_payload.id)
      .then((user: UserDocument | null) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);

export default passport;
