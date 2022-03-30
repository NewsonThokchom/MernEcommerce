import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API IS RUNNING....')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//use middleWare function from errorMiddleware.js file
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000 //import port number from .env

app.listen(5000, console.log(`Server running ${process.env.PORT} mode on port ${PORT}`.yellow.bold))