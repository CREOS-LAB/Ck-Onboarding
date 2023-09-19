import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './config/cors';
import Container from 'typedi';
import StudentsControllers from './controllers/StudentsControllers';
import { StudentServices } from './services/StudentsServices';
import verifyAuth from './middlewares/verifyAuth';
import cookieParser from "cookie-parser"
import { SchoolsController } from './controllers/SchoolsController';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { CollectionsController } from './controllers/CollectionsController';
import { ClassController } from './controllers/ClassesController';
import { VideosController } from './controllers/VideosController';
import { CommentsController } from './controllers/CommentsController';
import verifySchoolAuth from './middlewares/verifySchoolAuth';
import teacherControllers from './controllers/TeachersController';
import UploadedStudentControllers from './controllers/UploadedStudentController';
const swaggerDocument = require('../swagger.json');
import multer from "multer"
import * as path from "path"

// Configure Multer to store files with their original names and extensions
const storage = multer.diskStorage({
  destination: 'uploads-excel/', // Set your destination folder
  filename: (req, file, callback) => {
    // Extract the file extension from the original filename
    const fileExt = path.extname(file.originalname);

    // Generate a unique filename (you can use a library like `uuid` for this)
    const uniqueFilename = `${Date.now()}${fileExt}`;

    // Callback with the new filename
    callback(null, uniqueFilename);
  },
});

const upload = multer({storage})

require("dotenv").config()

const app = express();
const port =  process.env.PORT || 3020;
      
// Set up your routes and middleware here
// app.use(cors({
  app.use(cors({
    origin: ['https://ck-kids-dashboard.vercel.app', 'http://localhost:3000'],
    credentials: true,
  }));

// const allowedOrigins = ['http://localhost:3000', "https://ck-kids-dashboard.vercel.app"];


// // Enable CORS and allow credentials
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const origin = req.headers.origin;
  
//   // Check if the origin is in the allowedOrigins array
//   if (allowedOrigins.includes(String(origin))) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-csrf-token');
//   }
//   next();
// });

app.use(express.urlencoded({limit:"50mb",extended: false}))
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/cookie', (req:Request, res: Response)=>{
  res.cookie("cookie", "12345", {domain: ".vercel.app"});
  console.log(req.cookies)
  res.send(req.cookies)
})
     
// Run MongoDB
mongoose.connect(process.env.ATLAS_URI || `mongodb://127.0.0.1:27017/ck-onboarding`)
const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')});
      
//render the html file
app.get('/', (req, res) => {
res.sendFile(process.cwd() + '/public/index.html');
});
app.use('/upload', express.static('upload'));

//students route
const studentsController = Container.get(StudentsControllers);
app.get("/student/", verifyAuth, (req: Request, res: Response, next: NextFunction)=>studentsController.getLoggedInStudent(req, res,next))
app.post("/student/sign-up", (req: Request, res: Response)=>studentsController.signUp(req, res))
app.post("/student/sign-in", (req: Request, res: Response)=>studentsController.signIn(req, res))
app.get("/student/:id", (req: Request, res: Response, next: NextFunction)=>studentsController.getStudentById(req, res,next))
app.get("/student/email/:email", (req: Request, res: Response, next: NextFunction)=>studentsController.getStudentByEmail(req, res,next))
app.post("/logout", (req: Request, res: Response, next: NextFunction)=>studentsController.logout(req, res,next))
app.patch("/student/update", verifyAuth, (req: Request, res: Response, next: NextFunction)=>studentsController.updateStudent(req, res,next))
app.delete("/students/delete", verifyAuth, (req: Request, res: Response, next: NextFunction)=>studentsController.deleteStudent(req, res,next))
app.get("/students/leadership?limit=10", (req: Request, res: Response, next: NextFunction)=>studentsController.leaderBoard(req, res))
app.get("/students/all", (req: Request, res: Response, next: NextFunction)=> studentsController.getAll(req, res))

//teachers route;
const teachersController = Container.get(teacherControllers);

app.get("/teacher/", verifyAuth, (req: Request, res: Response, next: NextFunction)=>teachersController.getLoggedInTeacher(req, res,next))
app.post("/teacher/sign-up", (req: Request, res: Response)=>teachersController.signUp(req, res))
app.post("/teacher/sign-in", (req: Request, res: Response)=>teachersController.signIn(req, res))
app.get("/teacher/:id", (req: Request, res: Response, next: NextFunction)=>teachersController.getTeacherById(req, res,next))

//Upload data;
const uploadData = Container.get(UploadedStudentControllers)
app.post("/upload-student", verifySchoolAuth, upload.single("file") ,(req: Request, res:Response, next: NextFunction)=> uploadData.uploadStudents(req, res, next))

//schools route
const schoolController = Container.get(SchoolsController);
app.get("/school/", verifySchoolAuth, (req: Request, res: Response, next: NextFunction)=>schoolController.getLoggedInSchool(req, res,next))
app.post("/school/sign-up", (req: Request, res: Response)=>schoolController.signUp(req, res))
app.post("/school/sign-in", (req: Request, res: Response)=>schoolController.signIn(req, res))
app.get("/school/:id", (req: Request, res: Response, next: NextFunction)=>schoolController.getSchoolById(req, res,next))
app.get("/school/email/:email", (req: Request, res: Response, next: NextFunction)=>schoolController.getSchoolByEmail(req, res,next))
app.post("/logout", (req: Request, res: Response, next: NextFunction)=>schoolController.logout(req, res,next))
app.patch("/school/update", verifySchoolAuth, (req: Request, res: Response, next: NextFunction)=>schoolController.updateSchool(req, res,next))
app.delete("/school/delete", verifySchoolAuth, (req: Request, res: Response, next: NextFunction)=>schoolController.deleteSchool(req, res,next))
      

// Collections route
const collectionController = Container.get(CollectionsController);

app.get("/collections", (req: Request, res: Response, next: NextFunction)=>collectionController.getAll(req, res, next));
app.get("/collection/:id", (req: Request, res: Response, next: NextFunction)=>collectionController.getCollectionById(req, res, next))
app.delete("/collection/delete/:id", (req: Request, res: Response, next: NextFunction)=>collectionController.deleteCollection(req, res, next))
app.patch("/collection/update/:id", (req: Request, res: Response, next: NextFunction)=>collectionController.updateCollection(req, res, next))
app.get("/collections/:classId", (req: Request, res: Response, next: NextFunction)=>collectionController.getCollectionByClass(req, res, next))
app.post("/collection", (req: Request, res: Response, next: NextFunction)=>collectionController.create(req, res, next))

//Classes route
const classController = Container.get(ClassController);

app.get("/classes/:schoolId", (req: Request, res: Response, next: NextFunction)=>classController.getAll(req, res, next));//added to dos
app.get("/class/:id", (req: Request, res: Response, next: NextFunction)=>classController.getClassById(req, res, next))
app.delete("/class/:id", (req: Request, res: Response, next: NextFunction)=>classController.deleteclass(req, res, next))
app.patch("/class/:id", (req: Request, res: Response, next: NextFunction)=>classController.updateclass(req, res, next))
app.post("/class/:schoolId",verifySchoolAuth, (req: Request, res: Response, next: NextFunction)=>classController.create(req, res, next))


//Videos route
const videosController = Container.get(VideosController)

app.get("/videos", (req: Request, res: Response, next: NextFunction)=>videosController.getAll(req, res, next));
app.get("/video/:id", (req: Request, res: Response, next: NextFunction)=>videosController.getVideoById(req, res, next))
app.delete("/video/delete/:id", (req: Request, res: Response, next: NextFunction)=>videosController.deleteVideo(req, res, next))
app.patch("/video/update/:id", (req: Request, res: Response, next: NextFunction)=>videosController.updateVideo(req, res, next))
app.get("/video/by-collection/:collectionId", (req: Request, res: Response, next: NextFunction)=>videosController.getVideosByCollection(req, res, next))
app.post("/video", (req: Request, res: Response, next: NextFunction)=>videosController.create(req, res, next))
app.post("/videos/query", (req: Request, res: Response, next: NextFunction)=>videosController.queryVideos(req, res, next))
app.get("/videos/student", verifyAuth, (req: Request, res: Response, next: NextFunction)=>videosController.getStudentsVideos(req, res, next))
//Comments route
const commentsController = Container.get(CommentsController);

app.get("/comment", (req: Request, res: Response, next: NextFunction)=>commentsController.getAll(req, res, next));
app.get("/comment/:id", (req: Request, res: Response, next: NextFunction)=>commentsController.getCommentById(req, res, next))
app.delete("/comment/delete/:id", (req: Request, res: Response, next: NextFunction)=>commentsController.deleteComment(req, res, next))
app.patch("/comment/:id", (req: Request, res: Response, next: NextFunction)=>commentsController.updateComment(req, res, next))
app.get("/comment/:videoId", (req: Request, res: Response, next: NextFunction)=>commentsController.getCommentsByVideo(req, res, next))
app.post("/comment", (req: Request, res: Response, next: NextFunction)=>commentsController.create(req, res, next))

//6501938f9df5e3c94892ace2


// Run Server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
  });
        