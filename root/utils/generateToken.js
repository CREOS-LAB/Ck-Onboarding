"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = String(process.env.JWT_SECRET);
const generateToken = (_id, email, response) => {
    const token = jsonwebtoken_1.default.sign({ _id, email }, jwtSecret);
    response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 10000,
    });
    return token;
};
exports.default = generateToken;
