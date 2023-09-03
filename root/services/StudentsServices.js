"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const typedi_1 = require("typedi");
const bcrypt_1 = require("../config/bcrypt");
const students_model_1 = __importDefault(require("../models/students.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const ProductKeyServices_1 = require("./ProductKeyServices");
const SchoolsServices_1 = require("./SchoolsServices");
let StudentServices = class StudentServices {
    constructor(student = students_model_1.default, productKey, schoolServices) {
        this.student = student;
        this.productKey = productKey;
        this.schoolServices = schoolServices;
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate data
            data.password = yield (0, bcrypt_1.encodePassword)(data.password);
            let status = yield this.productKey.validateKey(data.productKey);
            data.school = yield this.schoolServices.getSchoolByKey(data.productKey);
            //validate key
            if (!status) {
                return {
                    payload: null,
                    message: "Invalid Product Key",
                    status: 401
                };
            }
            const student = yield new this.student(data).save();
            return {
                payload: student,
                message: "Signed Up Successfully",
                status: 201
            };
        });
    }
    signIn(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield this.student.findOne({ email: data.email });
            if (!student) {
                return {
                    payload: null,
                    status: 404,
                    message: "There's no user with this email"
                };
            }
            let doMatch = yield (0, bcrypt_1.comparePassword)(data.password, student === null || student === void 0 ? void 0 : student.password);
            if (!doMatch) {
                return {
                    payload: null,
                    status: 403,
                    message: "Incorrect Password"
                };
            }
            let token = (0, generateToken_1.default)(student._id, student.email, res);
            return {
                payload: { student, token },
                message: "Login Successful",
                status: 200
            };
        });
    }
    getStudentById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield this.student.findById(_id);
            return student;
        });
    }
    getStudentByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield this.student.findOne({ email });
            return student;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield this.student.findByIdAndUpdate(id, data, { new: true });
            return student;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield this.student.findByIdAndDelete(id);
            return student;
        });
    }
    getLeaderBoard(limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let students = yield this.student.find().limit(limit).sort({ gem: 1 });
            return students;
        });
    }
};
StudentServices = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object, ProductKeyServices_1.ProductKeyService,
        SchoolsServices_1.SchoolsServices])
], StudentServices);
exports.StudentServices = StudentServices;
