"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        next();
    }
    catch (error) {
        return res.status(403).send(error);
    }
};
exports.default = authenToken;
//# sourceMappingURL=verifyToken.js.map