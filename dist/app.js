"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./app/modules/user/user.routes");
const app = (0, express_1.default)();
// person
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cors_1.default)());
//user routes
app.use('/api/users', user_routes_1.userRoutes);
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the User and Order management server'
    });
});
exports.default = app;
