import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API IS RUNNING....')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})


const PORT = process.env.PORT || 5000 //import port number from .env

app.listen(5000, console.log(`Server running ${process.env.PORT} mode on port ${PORT}`.yellow.bold))