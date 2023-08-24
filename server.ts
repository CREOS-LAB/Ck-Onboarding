import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './src/config/cors';
import Container from 'typedi';
import StudentsControllers from './src/controllers/StudentsControllers';
import { StudentServices } from './src/services/StudentsServices';

require("dotenv").config()

const app = express();
const port = String(process.env.PORT) || 3030;
      
// Set up your routes and middleware here
app.use(cors(corsOptions));
express.urlencoded({limit:"50mb", extended: false})
express.json({limit:"50mb"})
     
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
app.use("/students/sign-up", (req: Request, res: Response)=>studentsController.signUp(req, res))
app.use("/students/sign-in", (req: Request, res: Response)=>studentsController.signIn(req, res))
app.use("/students/:id", (req: Request, res: Response, next: NextFunction)=>studentsController.getStudentById(req, res,next))
app.use("/students/:email", (req: Request, res: Response, next: NextFunction)=>studentsController.getStudentByEmail(req, res,next))

      
// Run Server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
      
  });
        