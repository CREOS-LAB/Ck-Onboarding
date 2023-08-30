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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolsController = void 0;
const typedi_1 = require("typedi");
require("reflect-metadata");
const SchoolsServices_1 = require("../services/SchoolsServices");
const reponseService_1 = require("../utils/reponseService");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const ProductKeyServices_1 = require("../services/ProductKeyServices");
let SchoolsController = class SchoolsController {
    constructor(schoolServices, productKey) {
        this.schoolServices = schoolServices;
        this.productKey = productKey;
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.productKey = yield this.productKey.generateKey();
                let result = yield this.schoolServices.signUp(data);
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
                let result = yield this.schoolServices.signIn(data);
                if (result.payload) {
                    (0, generateToken_1.default)(result.payload._id, result.payload.email);
                }
                (0, reponseService_1.resolve)(result.message, result.payload, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    getSchoolById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let result = yield this.schoolServices.getSchoolById(id);
                (0, reponseService_1.resolve)("Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    getSchoolByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email } = req.params;
                let result = yield this.schoolServices.getSchoolByEmail(email);
                (0, reponseService_1.resolve)("Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    getLoggedInSchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const user = yield this.schoolServices.getSchoolById(_id);
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
    updateSchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const _a = req.body, { password } = _a, data = __rest(_a, ["password"]);
                let result = yield this.schoolServices.update(_id, data);
                (0, reponseService_1.resolve)("Update Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
    deleteSchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                let result = yield this.schoolServices.delete(_id);
                (0, reponseService_1.resolve)("Deleted Successful", result, 200, res);
            }
            catch (err) {
                (0, reponseService_1.reject)(err.message, 400, res);
            }
        });
    }
};
SchoolsController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [SchoolsServices_1.SchoolsServices,
        ProductKeyServices_1.ProductKeyService])
], SchoolsController);
exports.SchoolsController = SchoolsController;
