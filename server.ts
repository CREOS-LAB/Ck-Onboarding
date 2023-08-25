import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './src/config/cors';
import Container from 'typedi';
import StudentsControllers from './src/controllers/StudentsControllers';
import { StudentServices } from './src/services/StudentsServices';
import verifyAuth from './src/middlewares/verifyAuth';
import cookieParser from "cookie-parser"

require("dotenv").config()

const app = express();
const port = String(process.env.PORT) || 3030;
      
// Set up your routes and middleware here
app.use(cors(corsOptions));
app.use(express.urlencoded({limit:"50mb", extended: false}))
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())
     
// Run MongoDB
mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/onboarding`)
const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')});
      
//render the html file
app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/index.html');
});

//students route
// const studentServices = Container.get(StudentServices)
const studentsController = Container.get(StudentsControllers);
app.get("/students/", verifyAuth, (req: Request, res: Response, next: NextFunction)=>studentsController.getLoggedInStudent(req, res,next))
app.post("/students/sign-up", (req: Request, res: Response)=>studentsController.signUp(req, res))
app.post("/students/sign-in", (req: Request, res: Response)=>studentsController.signIn(req, res))
app.get("/students/:id", (req: Request, res: Response, next: NextFunction)=>studentsController.getStudentById(req, res,next))
app.get("/students/email/:email", (req: Request, res: Response, next: NextFunction)=>studentsController.getStudentByEmail(req, res,next))
app.post("/logout", (req: Request, res: Response, next: NextFunction)=>studentsController.logout(req, res,next))
app.patch("/students/update", verifyAuth, (req: Request, res: Response, next: NextFunction)=>studentsController.updateStudent(req, res,next))
app.delete("/students/delete", verifyAuth, (req: Request, res: Response, next: NextFunction)=>studentsController.deleteStudent(req, res,next))
      
// Run Server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
      
  });
        