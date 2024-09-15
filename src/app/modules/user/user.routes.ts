import exprees from 'express'
import { userControllers } from './user.controllers'

const routes = exprees.Router()

routes.post('/', userControllers.createUser)
routes.get('/', userControllers.getAllUser)
routes.get('/:userId', userControllers.getSingleUserById)
routes.put('/:userId', userControllers.updateSingleUserById)
routes.delete('/:userId', userControllers.deleteUserById)

// add prdocuts to orders
routes.put('/:userId/orders', userControllers.addProductToOrders)
routes.get('/:userId/orders', userControllers.getOrdersOfASpeceficUserById)
routes.get(
    '/:userId/orders/total-price',
    userControllers.getAllOrderPriceOfASingleUserById
)

export const userRoutes = routes
