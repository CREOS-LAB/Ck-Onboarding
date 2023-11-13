import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.get("/google/student-callback",
    passport.authenticate("google", { failureRedirect: "/login" }),

    (req, res) => {
        res.redirect("/student/dashboard")
    })


authRouter.get("/google/teacher-callback", (req, res) => { })

export default authRouter;