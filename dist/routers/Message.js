"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const authenToken_1 = __importDefault(require("../middleware/authenToken"));
const router = (0, express_1.Router)();
router.get('/', authenToken_1.default, message_1.getAllMessages);
router.get('/:chatRoomId', authenToken_1.default, message_1.getMessageByChatRoomId);
router.post('/', authenToken_1.default, message_1.postMessage);
exports.default = router;
//# sourceMappingURL=message.js.map