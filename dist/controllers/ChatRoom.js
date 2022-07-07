"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChatRoom = exports.updateChatRoom = exports.postChatRoom = exports.getChatRoomByUserId = exports.getAllChatRoom = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const ChatRooms_1 = __importDefault(require("../models/ChatRooms"));
const getAllChatRoom = async (req, res) => {
    try {
        const chatRooms = await ChatRooms_1.default.find()
            .populate([
            { path: 'users' },
            {
                path: 'messages',
                populate: {
                    path: 'user',
                    model: 'Users',
                },
            },
        ])
            .sort({ createdAt: -1 });
        res.json(chatRooms);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getAllChatRoom = getAllChatRoom;
const getChatRoomByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const chatRooms = await ChatRooms_1.default.find({ users: userId }, { __v: 0 })
            .populate([
            {
                path: 'users',
                select: { _id: 1, username: 1, image: 1 },
            },
            {
                path: 'messages',
                select: { __v: 0 },
                options: {
                    sort: { createdAt: -1 },
                    limit: 10,
                },
                populate: {
                    path: 'user',
                    model: 'Users',
                    select: { _id: 1, username: 1, image: 1 },
                },
            },
        ])
            .sort({ updatedAt: -1 });
        res.json(chatRooms);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getChatRoomByUserId = getChatRoomByUserId;
const postChatRoom = async (req, res) => {
    try {
        const { name, users, messages } = req.body;
        const chatRoom = new ChatRooms_1.default({
            name,
            users,
            messages,
        });
        const savedChatRoom = await chatRoom.save();
        const chatRooms = await savedChatRoom.populate('users', 'messages');
        res.json(chatRooms);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.postChatRoom = postChatRoom;
const updateChatRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, users, messages } = req.body;
        const chatRoom = await ChatRooms_1.default.findByIdAndUpdate(id, { name, users, messages }, { new: true });
        res.json(chatRoom);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateChatRoom = updateChatRoom;
const deleteChatRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const chatRoom = await ChatRooms_1.default.findByIdAndDelete(id);
        const messagesDelete = await Messages_1.default.deleteMany({ chatRoom: id });
        res.json(chatRoom);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.deleteChatRoom = deleteChatRoom;
//# sourceMappingURL=chatRoom.js.map