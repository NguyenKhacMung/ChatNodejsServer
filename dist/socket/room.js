"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.addRoom = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const ChatRooms_1 = __importDefault(require("../models/ChatRooms"));
const addRoom = (socket, io) => {
    socket.on('addRoom', async ({ name, users, userAdd, avatar }, callBack) => {
        try {
            const chatRoom = new ChatRooms_1.default({
                name,
                users,
                avatar,
            });
            const savedChatRoom = await chatRoom.save();
            const chatRoomAdd = await savedChatRoom.populate([
                {
                    path: 'users',
                    select: { _id: 1, username: 1 },
                },
                {
                    path: 'messages',
                    select: { __v: 0 },
                    options: {
                        limit: 2,
                        sort: { createdAt: -1 },
                    },
                    populate: {
                        path: 'user',
                        model: 'Users',
                        select: { _id: 1, username: 1 },
                    },
                },
            ]);
            io.emit('addRoom', { chatRoomAdd, userAdd });
            callBack({
                status: true,
                chatRoomAdd,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.addRoom = addRoom;
const deleteRoom = (socket, io) => {
    socket.on('deleteRoom', async ({ chatRoomId }, callBack) => {
        try {
            const chatRoomDelete = await ChatRooms_1.default.findByIdAndDelete(chatRoomId);
            const messagesDelete = await Messages_1.default.deleteMany({ chatRoom: chatRoomId });
            io.emit('deleteRoom', {
                chatRoomDelete,
                messagesDelete,
            });
            callBack({
                status: true,
                chatRoomDelete,
                messagesDelete,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.deleteRoom = deleteRoom;
//# sourceMappingURL=room.js.map