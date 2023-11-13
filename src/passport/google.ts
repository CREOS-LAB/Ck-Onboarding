import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import { SchoolModel } from "../models/schools.model";
import { AuthUser, UserType } from "./types";
import { StudentModel } from "../models/students.model";
import { ErrorResponse } from "../response";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config/google.config";

const GoogleStrategy = Strategy;


passport.use('google-student', new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    scope: ['profile', 'email'],
    callbackURL: "/students/signin/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const foundStudent = await StudentModel.findOne({
        email: profile.emails![0].value
    })

    let user: AuthUser

    if (foundStudent) {
        user = {
            id: foundStudent.id,
            name: foundStudent.name,
            userType: UserType.STUDENT,
            email: foundStudent.email
        }
    } else {
        return done("Student not found")
    }


    done(null, user)
}));

passport.use('google-school', new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    scope: ['profile', 'email'],
    callbackURL: "/schools/sign-in/google/callback",
},
    async (accessToken, refreshToken, profile, done) => {

        const foundSchool = await SchoolModel.findOne({
            email: profile.emails![0].value
        });
        let user: AuthUser;
        if (foundSchool) {
            user = {
                id: foundSchool._id.toString(),
                name: foundSchool.name,
                userType: UserType.SCHOOL,
                email: foundSchool.email
            };
        } else {
            return done("No school found");
        }

        done(null, user);
    }));


passport.serializeUser(function (user, cb) {

    cb(null, user)
})

passport.deserializeUser(function (user, cb) {

    cb(null, user as Express.User)
})
