import { Model } from "mongoose"

// user address interface
export interface IAddress {
    street?: string
    city: string
    country: string
}

// user orders interface
export interface IOrders {
    productName: string
    price: number
    quantity: number
}

// user full name inteface
export interface IFullName {
    firstName: string
    lastName: string
}

// user new Model interface
export interface IUserModel extends Model<IUser>{
    // check if user exists in databse
    isUserExists(id: string): Promise<IUser | null>
}

export default interface IUser {
    userId: number
    username: string
    password: string
    fullName: IFullName
    age: number
    email: string
    isActive?: boolean
    hobbies: string[]
    address: IAddress
    orders: IOrders[]
}
