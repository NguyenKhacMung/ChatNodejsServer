"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.messageRouter = exports.chatRoomRouter = exports.userRouter = void 0;
const user_1 = __importDefault(require("./user"));
exports.userRouter = user_1.default;
const chatRoom_1 = __importDefault(require("./chatRoom"));
exports.chatRoomRouter = chatRoom_1.default;
const message_1 = __importDefault(require("./message"));
exports.messageRouter = message_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
//# sourceMappingURL=index.js.map