"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatRoom = new mongoose_1.Schema({
    name: { type: String, required: true },
    users: { type: [mongoose_1.Types.ObjectId], ref: 'Users' },
    messages: { type: [mongoose_1.Types.ObjectId], ref: 'Messages' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('ChatRoom', ChatRoom);
//# sourceMappingURL=ChatRoom.js.map