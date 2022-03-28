import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'

// const CartScreen = ({ match, location, history }) => {
const CartScreen = () => {

    const { id } = useParams()

    // console.log(productId)
    // const qty = location.search ? Number(location.search.split('=')[1]):1 //use in react router v5 or less

    const [searchParams] = useSearchParams() //useSearcgParams to get query string in react router dom v6
    const qty = searchParams.get('qty')
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart) //fetching data from store.js
    const { cartItems } = cart


    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    return <div>
        <h1>Product ID: {id}</h1>
        <p>
            Quantity: {qty}
        </p>
    </div>

}

export default CartScreen