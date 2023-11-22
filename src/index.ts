import "./config"
import "./bull"
import "./passport/google"
import { setup } from "./setup";
import { bulkCourseUploadQueue } from "./bull";


//Note that the 

const app = setup()


// Run Server
const port = process.env.PORT || 3020;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


bulkCourseUploadQueue.isReady().then(()=>{
  bulkCourseUploadQueue.add({
    filename: "./uploads/excel/1700133368616.xlsx"
  })
})
