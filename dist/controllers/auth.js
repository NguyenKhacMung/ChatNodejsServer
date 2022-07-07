"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Users_1 = __importDefault(require("../models/Users"));
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Wrong password' });
        }
        const token = (0, jsonwebtoken_1.sign)({
            id: user._id,
            username,
            password,
        }, process.env.JWT_SECRET);
        res.json({
            _id: user._id,
            username,
            password,
            token,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=auth.js.map