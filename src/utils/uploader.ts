import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as os from 'os';

dotenv.config();

const mainFolder: string = process.cwd() + "/upload"

if (!fs.existsSync(mainFolder)) {
    fs.mkdirSync(mainFolder);
}

const baseUri: string | undefined = process.env.BASE_URL;

interface MediaData {
    base64: string;
}

const uploader = (data: MediaData): string => {
    const name: string = uuidv4();
    const base64Image: string = data.base64;

    // remove the data:image/png;base64, prefix
    const base64Data: string = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // setting file path
    const filePath: string = path.join(mainFolder, `${name}.jpeg`);

    // create a buffer from the base64 data
    const imageBuffer: Buffer = Buffer.from(base64Data, 'base64');

    // write the buffer to the file
    fs.writeFileSync(filePath, imageBuffer);
    return `${baseUri}upload/${name}.jpeg`;
};

const uploaderListOfMedia = (arr: MediaData[]): string[] => {
    const newArr: string[] = [];

    console.log(os.hostname());
    for (let i = 0; i < arr.length; i++) {
        newArr.push(uploader(arr[i]));
        console.log(newArr);
    }
    return newArr;
};

export { uploader, uploaderListOfMedia };
