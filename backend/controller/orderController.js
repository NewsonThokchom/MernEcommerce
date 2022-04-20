import asyncHandler from 'express-async-handler'



// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAdress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400) //bad request
        throw new Error('No order items')
        return
    } else {

        const order = new order({
            orderItems,
            shippingAdress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createOrder = await order.save()
        res.status(201).json(createOrder)


    }


})

export {
    addOrderItems
}