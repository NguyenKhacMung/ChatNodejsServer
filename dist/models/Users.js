"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Users', User);
//# sourceMappingURL=Users.js.map