"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const routes = express_1.default.Router();
routes.post('/', user_controllers_1.userControllers.createUser);
routes.get('/', user_controllers_1.userControllers.getAllUser);
routes.get('/:userId', user_controllers_1.userControllers.getSingleUserById);
routes.put('/:userId', user_controllers_1.userControllers.updateSingleUserById);
routes.delete('/:userId', user_controllers_1.userControllers.deleteUserById);
// add prdocuts to orders
routes.put('/:userId/orders', user_controllers_1.userControllers.addProductToOrders);
routes.get('/:userId/orders', user_controllers_1.userControllers.getOrdersOfASpeceficUserById);
routes.get('/:userId/orders/total-price', user_controllers_1.userControllers.getAllOrderPriceOfASingleUserById);
exports.userRoutes = routes;
