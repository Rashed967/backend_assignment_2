import exprees from 'express'
import { userControllers } from './user.controllers'

const routes = exprees.Router()

routes.post('/', userControllers.createUser)
routes.get('/', userControllers.getAllUser)
routes.get('/:userId', userControllers.getSingleUserById)
routes.put('/:userId', userControllers.updateSingleUserById)
routes.delete('/:userId', userControllers.deleteUserById)

export const userRoutes = routes
