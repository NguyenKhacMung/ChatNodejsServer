"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenToken_1 = __importDefault(require("../middleware/authenToken"));
const chatRoom_1 = require("../controllers/chatRoom");
const router = (0, express_1.Router)();
router.get('/user/:userId', authenToken_1.default, chatRoom_1.getChatRoomByUserId);
router.get('/', authenToken_1.default, chatRoom_1.getAllChatRoom);
router.post('/', authenToken_1.default, chatRoom_1.postChatRoom);
router.delete('/:id', authenToken_1.default, chatRoom_1.deleteChatRoom);
exports.default = router;
//# sourceMappingURL=chatRoom.js.map