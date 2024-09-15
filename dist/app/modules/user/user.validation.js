"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.userProductValidation = exports.userAddressValidaion = exports.userFullNameValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// user fullname validaion schema
exports.userFullNameValidation = joi_1.default.object({
    firstName: joi_1.default.string().min(3).required().messages({
        'stirng.empty': 'firstName cannot be empty',
        'string.min': 'firstName needs atleast 3 characters',
        'any.required': 'firstName is required field',
    }),
    lastName: joi_1.default.string().min(3).required().messages({
        'stirng.empty': 'firstName cannot be empty',
        'string.min': 'firstName needs atleast 3 characters',
        'any.required': 'firstName is required field',
    }),
});
// user Address validaion schema
exports.userAddressValidaion = joi_1.default.object({
    street: joi_1.default.string().messages({
        'stirng.empty': 'street cannot be empty',
    }),
    city: joi_1.default.string().required().messages({
        'stirng.empty': 'city cannot be empty',
        'any.required': 'city is required field',
    }),
    country: joi_1.default.string().required().messages({
        'stirng.empty': 'country cannot be empty',
        'any.required': 'country is required field',
    }),
});
// user Orders validaion schema
exports.userProductValidation = joi_1.default.object({
    productName: joi_1.default.string().required().messages({
        'stirng.empty': 'productName cannot be empty',
        'any.required': 'productName is required field',
    }),
    price: joi_1.default.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required field',
    }),
    quantity: joi_1.default.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required field',
    }),
});
// user validaion schema
exports.userValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required().messages({
        'number.base': 'userId must be number type',
        'any.required': 'userId is a required field',
    }),
    username: joi_1.default.string().min(4).required().messages({
        'string.empty': 'username cannot be empty',
        'string.min': 'username needs atleast 4 characters',
        'any.required': 'username is required field',
    }),
    password: joi_1.default.string().min(12).required().messages({
        'string.empty': 'password cannot be empty',
        'string.min': 'password needs atleast 12 characters',
        'any.required': 'password is required field',
    }),
    fullName: exports.userFullNameValidation,
    age: joi_1.default.number().required().messages({
        'number.base': 'age must be a number',
        'any.required': 'age is required field',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.empty': 'email cannot be empty',
        'string.email': 'valid email address required',
        'any.required': 'email is required field',
    }),
    isActive: joi_1.default.boolean().default(true).messages({
        'boolean.base': 'The value must be true or false',
    }),
    hobbies: joi_1.default.array().items(joi_1.default.string()).required().messages({
        'array.base': 'hobbies field must be an array',
        'array.includes': 'each item of hobbies must be string',
        'any.required': 'hobbies field is required',
    }),
    address: exports.userAddressValidaion,
    orders: joi_1.default.array().items(exports.userProductValidation).messages({
        'array.base': 'orders field must be an array type',
        'array.includes': 'each order item should be an object',
    }),
});
