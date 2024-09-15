import { Request, Response } from 'express'
import { userValidationSchema } from './user.validation'
import { userServices } from './user.serviceses'
import { User } from './user.model'

// create user
const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body.data
        const { error, value } = userValidationSchema.validate(user)
        if (error) {
            res.status(400).json({
                success: false,
                message: 'user creatoin vlalidation field',
                error: error.details,
            })
        } else {
            const result = await userServices.createUserInDb(value)
            res.status(200).json({
                success: true,
                message: 'user creatoin successfull',
                data: result,
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'cannot create user',
            error: error,
        })
    }
}

// get all user
const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserFromDb()
        res.status(200).json({
            success: true,
            message: 'found all user',
            error: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "something wen't wrong, can't find any user",
            error: error,
        })
    }
}

// get single user by id
const getSingleUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const existingUser = await User.isUserExists(userId)
        if (!existingUser) {
            throw new Error('cannot found any user matched with this id')
        } else {
            const result = await userServices.getSigleUserByIdFromDb(userId)
            res.json({
                success: true,
                message: 'Found user data successfully',
                data: {
                    code: 200,
                    description: result,
                },
            })
        }
    } catch (error: any) {
        res.json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: error.message || 'something went wrong',
            },
        })
    }
}

// update single uer by id
const updateSingleUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const existingUser = await User.isUserExists(userId)
        if (!existingUser) {
            throw new Error('cannot matched any user with this id')
        } else {
            const dataToBeUpdated = req.body.data

            const result = await userServices.updateSingleUserByIdInDb(
                userId,
                dataToBeUpdated
            )

            res.status(200).json({
                success: true,
                message: 'user data updated successfully',
                data: result,
            })
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'something went wrong, cannot update this user data',
            error: error.message || 'something went wrong',
        })
    }
}

// delete user by id
const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const existingUser = await User.isUserExists(userId)
        if (!existingUser) {
            throw new Error('did not matched any user with this id')
        } else {
            const result = await userServices.deleteUserByIdInDb(userId)
            res.json({
                success: true,
                message: 'user deleted successfully',
                data: {
                    code: 200,
                    description: result,
                },
            })
        }
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: 'cannot delete user',
            error: {
                code: 404,
                description: error.message,
            },
        })
    }
}

export const userControllers = {
    createUser,
    getAllUser,
    getSingleUserById,
    updateSingleUserById,
    deleteUserById,
}
