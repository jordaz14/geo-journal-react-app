"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
// HANDLES AUTHENTICATION OF JWT FROM HTTP COOKIE
const authenticateJWT = (req, res, next) => {
    // Get token from http cookie
    const token = req.cookies.token;
    if (!token) {
        console.log("No token");
        req.user = null;
        return next();
    }
    // If token...
    try {
        // Verify token is valid & active
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_SECRET);
        // Add user prop to request with email, init date, and exp date
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("Invalid or expired token");
        req.user = null;
        next();
    }
};
exports.authenticateJWT = authenticateJWT;
