"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const validators_1 = require("../utils/validators");
const token_manager_1 = require("../utils/token-manager");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controllers_1.getAllUsers);
userRoutes.post("/signup", (0, validators_1.validate)(validators_1.signupValidator), user_controllers_1.userSignup);
userRoutes.post("/login", (0, validators_1.validate)(validators_1.loginValidator), user_controllers_1.userLogin);
userRoutes.get("/auth-status", token_manager_1.verifyToken, user_controllers_1.verifyUser);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map