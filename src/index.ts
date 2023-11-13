import "./config"
import "./bull"
import "./passport/google"
import { setup } from "./setup";


const app = setup()


// Run Server
const port = process.env.PORT || 3020;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

