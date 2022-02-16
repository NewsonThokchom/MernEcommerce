import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'


//@desc Fetch all products
//@route GET/api/products
//@access Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})
)


//@desc Fetch single products
//@route GET/api/products/:id
//@access Public
router.get('/:id', asyncHandler(async (req, res) => {
    // const product = products.find(p => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        // res.status(404).json({ message: 'Product not found!' })
        res.status(404).json({ error: 'Product not found' });
        return;
    }
})
)


export default router