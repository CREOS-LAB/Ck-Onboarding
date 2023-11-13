import { studentsRouter, teachersRouter, authRouter, schoolsRouter, collectionsRouter, classesRouter, videosRouter, contactRouter, commentsRouter, adminRouter, badgeRouter, newsletterRouter, courseRouter, notificationRouter, uploadRouter } from "."
import { Express } from "express"

export function setupRoutes(app: Express) {
    app.use("/students", studentsRouter)
    app.use("/teachers", teachersRouter)
    app.use("/schools", schoolsRouter)
    app.use("/collections", collectionsRouter)
    app.use("/classes", classesRouter)
    app.use("/videos", videosRouter)
    app.use("/contact", contactRouter)
    app.use("/comments", commentsRouter);
    app.use("/admin", adminRouter)
    app.use("/badges", badgeRouter)
    app.use("/newsletter", newsletterRouter)
    app.use("/notifications", notificationRouter)
    app.use("/courses", courseRouter)
    app.use(uploadRouter)
}