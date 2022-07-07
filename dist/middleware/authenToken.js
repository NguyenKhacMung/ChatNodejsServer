"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const authenToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const { id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.userId = id;
        next();
    }
    catch (error) {
        return res.status(403).send(error);
    }
};
exports.default = authenToken;
//# sourceMappingURL=authenToken.js.map