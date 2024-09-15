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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// user fullname schema
const userFullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
// user address schema
const userAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: false },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
// user Product schema
const userProductSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
// user schema
exports.userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: userFullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: false },
    hobbies: { type: [String], required: true },
    address: userAddressSchema,
    orders: { type: [userProductSchema], required: false },
});
// declare static methods
// declare checkUserExists static method
exports.userSchema.static('isUserExists', function isUserExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
});
// declare calculateOrderPriceses stattic method
exports.userSchema.static('calculateOrdersPrice', function calculateOrdersPrice(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.aggregate([
            // match stage
            {
                $match: { userId: id },
            },
            // unwind stage
            {
                $unwind: '$orders',
            },
            // group stage
            {
                $group: {
                    _id: '$studentId',
                    totalPrice: {
                        $sum: {
                            $multiply: ['$orders.price', '$orders.quantity'],
                        },
                    },
                },
            },
        ]);
    });
});
// pre hook for hassing password
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_round));
        next();
    });
});
// toJson hook for hiding password field
exports.userSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.password;
        return ret;
    },
});
// user model
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
