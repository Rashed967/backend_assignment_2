import { Types } from 'mongoose'
import IUser, { IProduct } from './user.interface'
import { User } from './user.model'

// create user in database
const createUserInDb = async (user: IUser) => {
    const result = await User.create(user)
    return result
}

// get all user from database
const getAllUserFromDb = async () => {
    const result = await User.find(
        {},
        { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
    )
    return result
}

// get a uer by id
const getSigleUserByIdFromDb = async (userId: string) => {
    const result = await User.findOne({ userId })
    return result
}

// update single user by id
const updateSingleUserByIdInDb = async (
    userId: string,
    dataToBeUpdated: IUser
) => {
    const result = await User.findOneAndUpdate(
        { userId },
        { ...dataToBeUpdated },
        { new: true }
    )
    return result
}

// delete user by id in database
const deleteUserByIdInDb = async (userId: string) => {
    const result = await User.deleteOne({ userId })
    return result
}

// add product
const addProductToOrdersInDb = async (userId: string, product: IProduct) => {
    const result = await User.updateOne(
        { userId },
        {
            $addToSet: {
                orders: product,
            },
        }
    )
    return result
}

// get all orders for specific user
const getAllOrdersForSpecificUerByIdInDb = async (userId: string) => {
    const result = await User.find({ userId }, { orders: 1 })
    return result
}

// totalOrderPrice of a single user from database

const getTotalOrderPriceOfASingleUerFromDb = async (id: string) => {
    const result = await User.aggregate([
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
    ])

    return result
}

export const userServices = {
    createUserInDb,
    getAllUserFromDb,
    getSigleUserByIdFromDb,
    updateSingleUserByIdInDb,
    deleteUserByIdInDb,
    addProductToOrdersInDb,
    getAllOrdersForSpecificUerByIdInDb,
    getTotalOrderPriceOfASingleUerFromDb,
}
