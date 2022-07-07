"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = exports.postUser = exports.getAllUsers = exports.getUserById = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = require("jsonwebtoken");
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users_1.default.findById(id, { __v: 0 });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getUserById = getUserById;
const getUserByToken = async (req, res) => {
    try {
        const id = req.userId;
        const user = await Users_1.default.findById(id, { __v: 0 });
        res.json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getUserByToken = getUserByToken;
const getAllUsers = async (req, res) => {
    try {
        const users = await Users_1.default.find({}, { __v: 0 });
        res.json(users);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
const postUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const Iuser = await Users_1.default.findOne({ username });
        if (Iuser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const user = new Users_1.default({
            username,
            password,
        });
        const savedUser = await user.save();
        const token = (0, jsonwebtoken_1.sign)({
            id: savedUser._id,
            username,
            password,
        }, process.env.JWT_SECRET);
        res.json({
            success: true,
            user: {
                _id: savedUser._id,
                username,
                password,
                token,
            },
        });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.postUser = postUser;
//# sourceMappingURL=user.js.map