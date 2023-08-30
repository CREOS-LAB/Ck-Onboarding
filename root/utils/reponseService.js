"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = exports.resolve = void 0;
const resolve = (message, payload, status, response) => {
    return response.status(status || 200).json({
        message,
        payload
    });
};
exports.resolve = resolve;
const reject = (message, status, response) => {
    return response.status(status).json({
        message,
        payload: null
    });
};
exports.reject = reject;
