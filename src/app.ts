import express from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.routes'

const app = express()

// person
app.use(express.json())
app.use(express.text())
app.use(cors())

//user routes
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the User and Order management server'
    })
})

export default app
