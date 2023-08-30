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
exports.ProductKeyService = void 0;
const typedi_1 = require("typedi");
const productKeys_model_1 = __importDefault(require("../models/productKeys.model"));
require("reflect-metadata");
let ProductKeyService = class ProductKeyService {
    constructor(model = productKeys_model_1.default) {
        this.model = model;
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield new this.model(data).save();
            return result;
        });
    }
    generateKey() {
        return __awaiter(this, void 0, void 0, function* () {
            let length = 12;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randomString = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters.charAt(randomIndex);
            }
            let key = yield this.save({ key: randomString });
            return key.key;
        });
    }
    validateKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.model.findOne({ key: key });
            if (!result) {
                return false;
            }
            return true;
        });
    }
};
ProductKeyService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], ProductKeyService);
exports.ProductKeyService = ProductKeyService;
