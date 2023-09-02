"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const typedi_1 = __importDefault(require("typedi"));
const StudentsControllers_1 = __importDefault(require("./controllers/StudentsControllers"));
const verifyAuth_1 = __importDefault(require("./middlewares/verifyAuth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const SchoolsController_1 = require("./controllers/SchoolsController");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require('../swagger.json');
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3020;
// Set up your routes and middleware here
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: false }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Run MongoDB
mongoose_1.default.connect(process.env.ATLAS_URI || `mongodb://127.0.0.1:27017/ck-onboarding`);
const connection = mongoose_1.default.connection;
connection.once('open', () => { console.log('Database running Successfully'); });
//render the html file
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});
//students route
const studentsController = typedi_1.default.get(StudentsControllers_1.default);
app.get("/student/", verifyAuth_1.default, (req, res, next) => studentsController.getLoggedInStudent(req, res, next));
app.post("/student/sign-up", (req, res) => studentsController.signUp(req, res));
app.post("/student/sign-in", (req, res) => studentsController.signIn(req, res));
app.get("/student/:id", (req, res, next) => studentsController.getStudentById(req, res, next));
app.get("/student/email/:email", (req, res, next) => studentsController.getStudentByEmail(req, res, next));
app.post("/logout", (req, res, next) => studentsController.logout(req, res, next));
app.patch("/student/update", verifyAuth_1.default, (req, res, next) => studentsController.updateStudent(req, res, next));
app.delete("/students/delete", verifyAuth_1.default, (req, res, next) => studentsController.deleteStudent(req, res, next));
//schools route
const schoolController = typedi_1.default.get(SchoolsController_1.SchoolsController);
app.get("/school/", verifyAuth_1.default, (req, res, next) => schoolController.getLoggedInSchool(req, res, next));
app.post("/school/sign-up", (req, res) => schoolController.signUp(req, res));
app.post("/school/sign-in", (req, res) => schoolController.signIn(req, res));
app.get("/school/:id", (req, res, next) => schoolController.getSchoolById(req, res, next));
app.get("/school/email/:email", (req, res, next) => schoolController.getSchoolByEmail(req, res, next));
app.post("/logout", (req, res, next) => schoolController.logout(req, res, next));
app.patch("/school/update", verifyAuth_1.default, (req, res, next) => schoolController.updateSchool(req, res, next));
app.delete("/school/delete", verifyAuth_1.default, (req, res, next) => schoolController.deleteSchool(req, res, next));
// Run Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
