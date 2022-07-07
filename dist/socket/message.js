"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const ChatRooms_1 = __importDefault(require("../models/ChatRooms"));
const sendMessage = (socket, io) => {
    socket.on('message', async (msg, callBack) => {
        try {
            const { chatRoomId, message, userId } = msg;
            const messageNew = new Messages_1.default({
                user: userId,
                message,
                chatRoom: chatRoomId,
            });
            const savedMessage = await messageNew.save();
            const chatRoom = await ChatRooms_1.default.findByIdAndUpdate(chatRoomId, { $push: { messages: savedMessage.id } }, { new: true, select: { __v: 0 } }).populate([
                {
                    path: 'users',
                    select: { _id: 1, username: 1, image: 1 },
                },
                {
                    path: 'messages',
                    select: { __v: 0 },
                    options: {
                        limit: 10,
                        sort: { createdAt: -1 },
                    },
                    populate: {
                        path: 'user',
                        model: 'Users',
                        select: { _id: 1, username: 1, image: 1 },
                    },
                },
            ]);
            const messages = await Messages_1.default.find({ chatRoom: chatRoomId }, { __v: 0 })
                .limit(10)
                .sort({ createdAt: -1 })
                .populate('user', { _id: 1, username: 1, image: 1 });
            io.emit('message', {
                messagesNew: messages.reverse(),
                chatRoom,
                chatRoomId,
            });
            callBack({
                status: true,
                message: 'Message sent',
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=message.js.map