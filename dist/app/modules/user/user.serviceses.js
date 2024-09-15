"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
// create user in database
const createUserInDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
// get all user from database
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
// get a uer by id
const getSigleUserByIdFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    return result;
});
// update single user by id
const updateSingleUserByIdInDb = (userId, dataToBeUpdated) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, Object.assign({}, dataToBeUpdated), { new: true });
    return result;
});
// delete user by id in database
const deleteUserByIdInDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
// add product
const addProductToOrdersInDb = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, {
        $addToSet: {
            orders: product,
        },
    });
    return result;
});
// get all orders for specific user
const getAllOrdersForSpecificUerByIdInDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ userId }, { orders: 1 });
    return result;
});
// totalOrderPrice of a single user from database
const getTotalOrderPriceOfASingleUerFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        // match stage
        {
            $match: { userId: parseInt(id) },
        },
        // unwind stage
        {
            $unwind: '$orders',
        },
        // group stage
        {
            $group: {
                _id: '$userId',
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                },
            },
        },
        // projectioin stage
        {
            $project: { totalPrice: 1, _id: 0 },
        },
    ]);
    return result;
});
exports.userServices = {
    createUserInDb,
    getAllUserFromDb,
    getSigleUserByIdFromDb,
    updateSingleUserByIdInDb,
    deleteUserByIdInDb,
    addProductToOrdersInDb,
    getAllOrdersForSpecificUerByIdInDb,
    getTotalOrderPriceOfASingleUerFromDb,
};
