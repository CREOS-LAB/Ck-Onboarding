// videosRouter.ts
import { Router } from 'express';
import { Container } from 'typedi';
import { VideosController } from '../controllers/videos.controller';
import verifyTeacherOrSchoolAuth from '../middlewares/verfyTeacherOrSchool';
import verifyAuth from '../middlewares/verifyAuth';
import { useValidateAndSanitize } from '../middlewares/useValidateAndSanitize';
import { Video } from '../models/videos.model';
import { verifyUserToken } from '../middlewares/verifyUserToken';

// Adjust the import path

export const videosRouter = Router();
const videosController = Container.get(VideosController);

videosRouter.get("/", videosController.getAll);
videosRouter.get("/:id", videosController.getVideoById);
videosRouter.delete("/delete/:id", videosController.deleteVideo);
videosRouter.patch("/update/:id", videosController.updateVideo);
videosRouter.get("/by-collection/:collectionId", videosController.getVideosByCollection);
videosRouter.post("/", useValidateAndSanitize(Video), videosController.createVideo);
videosRouter.post("/query", videosController.queryVideos);
videosRouter.get("/student", verifyAuth, videosController.getStudentsVideos);
videosRouter.post("/bulk-upload", verifyUserToken, videosController.bulkUpload);
// videosRouter.post("/bulk-upload-2", verifyTeacherOrSchoolAuth, upload.single("file"), videosController.bulkUpload2);
videosRouter.patch("/watch/:id", verifyAuth, videosController.watchVideo);
videosRouter.patch("/complete/:id", verifyAuth, videosController.completeVideo);
videosRouter.patch("/view/:id", verifyAuth, videosController.viewVideo);
videosRouter.get("/search", videosController.searchVideos);




export default videosRouter;
