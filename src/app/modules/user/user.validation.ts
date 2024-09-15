import Joi from 'joi'

// user fullname validaion schema
export const userFullNameValidation = Joi.object({
    firstName: Joi.string().min(3).required().messages({
        'stirng.empty': 'firstName cannot be empty',
        'string.min': 'firstName needs atleast 3 characters',
        'any.required': 'firstName is required field',
    }),
    lastName: Joi.string().min(3).required().messages({
        'stirng.empty': 'firstName cannot be empty',
        'string.min': 'firstName needs atleast 3 characters',
        'any.required': 'firstName is required field',
    }),
})

// user Address validaion schema
export const userAddressValidaion = Joi.object({
    street: Joi.string().messages({
        'stirng.empty': 'street cannot be empty',
    }),
    city: Joi.string().required().messages({
        'stirng.empty': 'city cannot be empty',
        'any.required': 'city is required field',
    }),
    country: Joi.string().required().messages({
        'stirng.empty': 'country cannot be empty',
        'any.required': 'country is required field',
    }),
})

// user Orders validaion schema
export const userOrdersValidation = Joi.object({
    productName: Joi.string().required().messages({
        'stirng.empty': 'productName cannot be empty',
        'any.required': 'productName is required field',
    }),
    price: Joi.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required field',
    }),
    quantity: Joi.number().required().messages({
        'number.base': 'price must be a number',
        'any.required': 'price is required field',
    }),
})

// user validaion schema

export const userValidationSchema = Joi.object({
    userId: Joi.number().min(3).required().messages({
        'number.base': 'userId must be number type',
        'number.min': 'userid needs minimum 3 digid',
        'any.required': 'userId is a required field',
    }),
    username: Joi.string().min(4).required().messages({
        'string.empty': 'username cannot be empty',
        'string.min': 'username needs atleast 4 characters',
        'any.required': 'username is required field',
    }),
    password: Joi.string().min(12).required().messages({
        'string.empty': 'password cannot be empty',
        'string.min': 'password needs atleast 12 characters',
        'any.required': 'password is required field',
    }),
    fullName: userFullNameValidation,
    age: Joi.number().required().messages({
        'number.base': 'age must be a number',
        'any.required': 'age is required field',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'email cannot be empty',
        'string.email': 'valid email address required',
        'any.required': 'email is required field',
    }),
    isActive: Joi.boolean().default(true).messages({
        'boolean.base': 'The value must be true or false',
    }),
    hobbies: Joi.array().items(Joi.string()).required().messages({
        'array.base': 'hobbies field must be an array',
        'array.includes': 'each item of hobbies must be string',
        'any.required': 'hobbies field is required',
    }),
    address: userAddressValidaion,
    orders: Joi.array().items(userOrdersValidation).messages({
        'array.base' : 'orders field must be an array type',
        'array.includes' : 'each order item should be an object'
    }),
})
