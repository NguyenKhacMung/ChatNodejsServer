"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const message = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    chatRoom: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    message: {
        value: { type: String, required: true },
        type: { type: String, required: true },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Messages', message);
//# sourceMappingURL=Messages.js.map