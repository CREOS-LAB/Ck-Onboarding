import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"



const localStrategy = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => { })


passport.use("local", localStrategy);

