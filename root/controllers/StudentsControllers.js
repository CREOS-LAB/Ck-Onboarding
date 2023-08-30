"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importStar(require("typedi"));
const StudentsServices_1 = require("../services/StudentsServices");
const reponseService_1 = require("../utils/reponseService");
require("reflect-metadata");
let StudentsControllers = class StudentsControllers {
    constructor(studentsServices = typedi_1.default.get(StudentsServices_1.StudentServices)) {
        this.studentsServices = studentsServices;
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                let result = yield this.studentsServices.signUp(data);
                (0, reponseService_1.resolve)(result.message, result.payload, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                let result = yield this.studentsServices.signIn(data);
                if (result.payload) {
                }
                (0, reponseService_1.resolve)(result.message, result.payload, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    getStudentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let result = yield this.studentsServices.getStudentById(id);
                (0, reponseService_1.resolve)("Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    getStudentByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email } = req.params;
                let result = yield this.studentsServices.getStudentByEmail(email);
                (0, reponseService_1.resolve)("Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    getLoggedInStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const user = yield this.studentsServices.getStudentById(_id);
                (0, reponseService_1.resolve)("Successful", user, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("jwt", "", {
                    httpOnly: true,
                    expires: new Date()
                });
                res.json({ message: "Logged Out Successfully" });
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    updateStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const _a = req.body, { password } = _a, data = __rest(_a, ["password"]);
                let result = yield this.studentsServices.update(_id, data);
                (0, reponseService_1.resolve)("Update Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    deleteStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                let result = yield this.studentsServices.delete(_id);
                (0, reponseService_1.resolve)("Deleted Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
};
StudentsControllers = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], StudentsControllers);
exports.default = StudentsControllers;
