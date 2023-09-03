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
const nodemailer_1 = __importDefault(require("nodemailer"));
require("reflect-metadata");
const typedi_1 = require("typedi");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS || "eolaosebikan60@gmail.com",
        pass: process.env.EMAIL_TEST_PASSWORD || "zrheordooredhgxv"
    }
});
let EmailService = class EmailService {
    constructor() {
    }
    mail(receiver, sender, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `${sender}<${process.env.EMAIL_ADDRESS}>`,
                to: receiver,
                subject: subject,
                html: html
            };
            transporter.sendMail(mailOptions, (error, info) => {
                console.log("sending...");
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
    sendSignUpDetails(email, password, productKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = (email, password, productKey) => {
                return `
            <div>
                <h3> Welcome to Curious Kids </h3>
                <p> Here are you details </p>
                <p>email: ${email} </p>
                <p>password: ${password} </p>
                <p>product key: ${productKey} </p>
            </div>
        `;
            };
            html = html(email, password, productKey);
            this.mail(email, "Emmy", "Welcome to Curious Kids", html);
        });
    }
};
EmailService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.default = EmailService;
