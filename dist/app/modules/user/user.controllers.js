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
exports.userControllers = void 0;
const user_validation_1 = require("./user.validation");
const user_serviceses_1 = require("./user.serviceses");
const user_model_1 = require("./user.model");
// create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.data;
        const { error, value } = user_validation_1.userValidationSchema.validate(user);
        if (error) {
            res.status(400).json({
                success: false,
                message: 'user creatoin vlalidation field',
                error: error.details,
            });
        }
        else {
            const result = yield user_serviceses_1.userServices.createUserInDb(value);
            res.status(200).json({
                success: true,
                message: 'user creatoin successfull',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'cannot create user',
            error: error,
        });
    }
});
// get all user
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_serviceses_1.userServices.getAllUserFromDb();
        res.status(200).json({
            success: true,
            message: 'found all user',
            error: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "something wen't wrong, can't find any user",
            error: error,
        });
    }
});
// get single user by id
const getSingleUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const existingUser = yield user_model_1.User.isUserExists(userId);
        if (!existingUser) {
            throw new Error('cannot found any user matched with this id');
        }
        else {
            const result = yield user_serviceses_1.userServices.getSigleUserByIdFromDb(userId);
            res.json({
                success: true,
                message: 'Found user data successfully',
                data: {
                    code: 200,
                    description: result,
                },
            });
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        });
    }
});
// update single uer by id
const updateSingleUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const existingUser = yield user_model_1.User.isUserExists(userId);
        if (!existingUser) {
            throw new Error('cannot matched any user with this id');
        }
        else {
            const dataToBeUpdated = req.body.data;
            const result = yield user_serviceses_1.userServices.updateSingleUserByIdInDb(userId, dataToBeUpdated);
            res.status(200).json({
                success: true,
                message: 'user data updated successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong, cannot update this user data',
            error: error.message || 'something went wrong',
        });
    }
});
// delete user by id
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const existingUser = yield user_model_1.User.isUserExists(userId);
        if (!existingUser) {
            throw new Error('did not matched any user with this id');
        }
        else {
            const result = yield user_serviceses_1.userServices.deleteUserByIdInDb(userId);
            res.json({
                success: true,
                message: 'user deleted successfully',
                data: {
                    code: 200,
                    description: result,
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'cannot delete user',
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
// orders
// add product to db
const addProductToOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const existingUser = yield user_model_1.User.isUserExists(userId);
        if (!existingUser) {
            throw new Error('did not matched any user with this id');
        }
        else {
            const newProduct = req.body.data;
            const { error, value } = user_validation_1.userProductValidation.validate(newProduct);
            if (error) {
                throw new Error('Product validaion error, must validate all fields');
            }
            else {
                const result = yield user_serviceses_1.userServices.addProductToOrdersInDb(userId, value);
                res.status(200).json({
                    success: true,
                    messag: 'product added to the orders successfully',
                    data: result,
                });
            }
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'product did not added',
            error: error.message || 'something went wrong',
        });
    }
});
// get orders of a specefic user by id
const getOrdersOfASpeceficUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const existingUser = yield user_model_1.User.isUserExists(userId);
        if (!existingUser) {
            throw new Error('did not matched any user with this id');
        }
        else {
            const result = yield user_serviceses_1.userServices.getAllOrdersForSpecificUerByIdInDb(userId);
            res.status(200).json({
                success: true,
                message: 'All orders found successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'did not find users orders',
            error: error.message || 'something went wrong',
        });
    }
});
// get single user all ordrs prices
const getAllOrderPriceOfASingleUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const existingUser = yield user_model_1.User.isUserExists(userId);
        if (!existingUser) {
            throw new Error('did not match any user with this id');
        }
        else {
            const result = yield user_serviceses_1.userServices.getTotalOrderPriceOfASingleUerFromDb(userId);
            res.status(200).json({
                success: true,
                mesage: "user's totatl price found successfully",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'did not found total price',
            error: error.message || 'something went wrong',
        });
    }
});
exports.userControllers = {
    createUser,
    getAllUser,
    getSingleUserById,
    updateSingleUserById,
    deleteUserById,
    addProductToOrders,
    getOrdersOfASpeceficUserById,
    getAllOrderPriceOfASingleUserById,
};
