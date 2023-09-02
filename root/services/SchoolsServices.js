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
exports.SchoolsServices = void 0;
const typedi_1 = require("typedi");
const schools_model_1 = __importDefault(require("../models/schools.model"));
const bcrypt_1 = require("../config/bcrypt");
require("reflect-metadata");
let SchoolsServices = class SchoolsServices {
    constructor(model = schools_model_1.default) {
        this.model = model;
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate data
            data.password = yield (0, bcrypt_1.encodePassword)(data.password);
            const school = yield new this.model(data).save();
            return {
                payload: school,
                message: "Signed Up Successfully",
                status: 201
            };
        });
    }
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let school = yield this.model.findOne({ email: data.email });
            if (!school) {
                return {
                    payload: null,
                    status: 404,
                    message: "There's no School with this email"
                };
            }
            let doMatch = yield (0, bcrypt_1.comparePassword)(data.password, school === null || school === void 0 ? void 0 : school.password);
            if (!doMatch) {
                return {
                    payload: null,
                    status: 403,
                    message: "Incorrect Password"
                };
            }
            return {
                payload: school,
                message: "Login Successful",
                status: 200
            };
        });
    }
    getSchoolById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let school = yield this.model.findById(_id);
            return school;
        });
    }
    getSchoolByKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let school = yield this.model.findOne({ productKey: key });
            return school;
        });
    }
    getSchoolByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let school = yield this.model.findOne({ email });
            return school;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let school = yield this.model.findByIdAndUpdate(id, data, { new: true });
            return school;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let school = yield this.model.findByIdAndDelete(id);
            return school;
        });
    }
};
SchoolsServices = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], SchoolsServices);
exports.SchoolsServices = SchoolsServices;
