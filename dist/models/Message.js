"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const message = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users' },
    chatRoom: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ChatRoom' },
    message: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Messages', message);
//# sourceMappingURL=Message.js.map