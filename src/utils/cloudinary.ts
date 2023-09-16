import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const upload = async (data: any)=>{
    let url;
    await cloudinary.uploader.upload(data)
    .then(resp => {
        url = resp.secure_url;
    })
    .catch(err => console.log(err))
    return url;
}

export { cloudinary, upload };
