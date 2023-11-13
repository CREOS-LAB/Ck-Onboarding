import "./config"
import express, { Express } from 'express'
import "./passport/google"
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger.json';
import passport from 'passport';
import session from "express-session"
import morgan from "morgan"
import { APP_URL } from './config/app.config';
import { initModels } from './models/initModels';
import "./bull"
import { createSession } from "better-sse"
import { ErrorResponseInterface } from "./response"
import { Request, Response, NextFunction } from "express"
import { errorLogger } from "./logger"
import { setupRoutes } from "./routes/setup_routes"

export function setup() {
    const app = express()
    //render the html file
    app.get('/', (req, res) => {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.use('/upload', express.static('upload'));

    app.get("/sse", async (req, res) => {
        const session = await createSession(req, res);

        session.push("Hello world!");
    });

    app.use(morgan("dev", {

    }))

    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    }))

    app.use(cors({
        origin: ['https://ck-kids-dashboard.vercel.app', APP_URL || "http://localhost:3000"],
        credentials: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session())
    app.use(express.urlencoded({ limit: "50mb", extended: false }))
    app.use(express.json({ limit: "50mb" }))
    app.use(cookieParser())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use((err: ErrorResponseInterface | Error | any, req: Request, res: Response, next: NextFunction) => {
        errorLogger.log(err)
        res.status(err.status || 500).send(err)
    });


    mongoose.connect(process.env.ATLAS_URI || `mongodb://127.0.0.1:27017/curious-kidz`)
    const connection = mongoose.connection

    connection.once('open', () => {
        console.log('Database running Successfully')
        initModels()
    });

    setupRoutes(app)


    return app

}