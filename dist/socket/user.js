"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const updateUser = (socket, io) => {
    socket.on('updateUser', async ({ username, userId, image }, callBack) => {
        try {
            const user = await Users_1.default.findOneAndUpdate({
                _id: userId,
            }, {
                username,
                image,
            }, {
                new: true,
                select: { password: 0, __v: 0 },
            });
            io.emit('updateUser', {
                user,
            });
            callBack({
                status: true,
                user,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map