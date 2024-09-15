import IUser from './user.interface'
import { User } from './user.model'


// create user in database
const createUserInDb = async (user: IUser) => {
    const result = await User.create(user)
    return result
}

// get all user from database
const getAllUserFromDb = async () => {
      const result = await User.find({}, {username:1, fullName:1, age:1, email:1, address:1})
      return result
}

// get a uer by id
const getSigleUserByIdFromDb = async (userId: string) => {
    const result = await User.findOne({userId})
    console.log(result);
    return result
}

// update single user by id
const updateSingleUserByIdInDb = async (userId:string, dataToBeUpdated:IUser) => {
    console.log(dataToBeUpdated);
    const result = await User.findOneAndUpdate({userId}, {...dataToBeUpdated}, {new: true})
    return result
    
}

// delete user by id in database 
const deleteUserByIdInDb = async (userId: string) => {
    const result = await User.deleteOne({userId})
    return result    
}

export const userServices = {
    createUserInDb,
    getAllUserFromDb,
    getSigleUserByIdFromDb,
    updateSingleUserByIdInDb,
    deleteUserByIdInDb
}
