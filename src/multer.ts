import multer from "multer"
import * as path from "path"

const excelStorage = multer.diskStorage({
    destination: './uploads/excel/', // Set your destination folder
    filename: (req, file, callback) => {
        // Extract the file extension from the original filename
        const fileExt = path.extname(file.originalname);

        // Generate a unique filename (you can use a library like `uuid` for this)
        const uniqueFilename = `${Date.now()}${fileExt}`;

        // Callback with the new filename
        callback(null, uniqueFilename);
    },
});

const imageStorage = multer.diskStorage({
    destination: './uploads/images/', // Set your destination folder
    filename: (req, file, callback) => {
        // Extract the file extension from the original filename
        const fileExt = path.extname(file.originalname);

        // Generate a unique filename (you can use a library like `uuid` for this)
        const uniqueFilename = `${Date.now()}${fileExt}`;

        // Callback with the new filename
        callback(null, uniqueFilename);
    },
});
export const upload: any = {}



export const uploadExcel = multer({ storage: excelStorage })
export const uploadImage = multer({ storage: imageStorage })