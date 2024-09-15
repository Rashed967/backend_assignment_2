import { model, Model, Schema } from 'mongoose'
import IUser, {
    IAddress,
    IFullName,
    IProduct,
    IUserModel,
} from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

// user fullname schema
const userFullNameSchema = new Schema<IFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

// user address schema
const userAddressSchema = new Schema<IAddress>({
    street: { type: String, required: false },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

// user Product schema
const userProductSchema = new Schema<IProduct>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

// user schema
export const userSchema = new Schema<IUser, IUserModel>({
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
})

// declare static methods
// declare checkUserExists static method
userSchema.static('isUserExists', async function isUserExists(id: string) {
    const existingUser = await User.findOne({ userId: id })
    return existingUser
})

// declare calculateOrderPriceses stattic method
userSchema.static(
    'calculateOrdersPrice',
    async function calculateOrdersPrice(id: string) {
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
        ])
    }
)

// pre hook for hassing password
userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.salt_round))
    next()
})

// toJson hook for hiding password field
userSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.password
        return ret
    },
})

// user model
export const User = model<IUser, IUserModel>('User', userSchema)
