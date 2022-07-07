"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authenToken_1 = __importDefault(require("../middleware/authenToken"));
const router = (0, express_1.Router)();
router.get('/:id', authenToken_1.default, user_1.getUserById);
router.get('/all/users', authenToken_1.default, user_1.getAllUsers);
router.get('/', authenToken_1.default, user_1.getUserByToken);
router.post('/', user_1.postUser);
exports.default = router;
//# sourceMappingURL=user.js.map