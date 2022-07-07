"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageByChatRoomId = exports.postMessage = exports.getAllMessages = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const getAllMessages = async (req, res) => {
    try {
        const messages = await Messages_1.default.find().populate('user');
        res.json(messages);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getAllMessages = getAllMessages;
const getMessageByChatRoomId = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const { limit } = req.query;
        const message = await Messages_1.default.find({ chatRoom: chatRoomId }, { __v: 0 })
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('user', { _id: 1, username: 1, image: 1 });
        res.json(message.reverse());
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getMessageByChatRoomId = getMessageByChatRoomId;
const postMessage = async (req, res) => {
    try {
        const { user, message, chatRoom } = req.body;
        const messages = new Messages_1.default({
            user,
            message,
            chatRoom,
        });
        const savedMessage = await messages.save();
        const Imessage = await savedMessage.populate('user');
        res.json(Imessage);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.postMessage = postMessage;
//# sourceMappingURL=message.js.map