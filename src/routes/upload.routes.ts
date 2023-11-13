import { Router } from "express";
import { uploadExcel, uploadImage } from "../multer";
import { SuccessResponse } from "../response";

//TODO Use cloudinary to store data instead of on the server

export const uploadRouter = Router()

uploadRouter.post("/upload-image", uploadImage.single("file"), (req, res, next) => {
    console.log(req.file)
    res.status(201).json(SuccessResponse({
        message: "Uploaded Successfully",
        result: req.file?.filename
    }))
})

uploadRouter.post("/upload-excel", uploadExcel.single("file"), (req, res, next) => {
    console.log(req.file)
    res.status(201).json(SuccessResponse({
        message: "Uploaded Successfully",
        result: req.file?.filename
    }))
})


uploadRouter.post("/upload-students", uploadExcel.single("file"))

