import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'

// const CartScreen = ({ match, location, history }) => {
const CartScreen = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    // console.log(productId)
    // const qty = location.search ? Number(location.search.split('=')[1]):1 //use in react router v5 or less
    const [searchParams] = useSearchParams() //useSearcgParams to get query string in react router dom v6

    const qty = searchParams.get('qty')

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart) //fetching data from store.js

    const { cartItems } = cart
    // console.log(cartItems.map(item => (item.qty)))

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = () => {
        console.log('removed')
    }

    const checkoutHandler = () => {
        console.log('Checkout')
        navigate('/login?redirect=shipping')

    }

    return <Row>
        {/* <h1>Product ID: {id}</h1>
        <p>
            Quantity: {qty}
        </p> */}

        <Col md={8}>
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ?

                (<Message>Your cart is empty.
                    <Link to='/'>Go Back</Link>
                </Message>) :

                (<ListGroup variant="flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>

                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.brand}</Link>
                                </Col>

                                <Col md={2}>${item.price}</Col>

                                <Col md={2}>
                                    <Form.Control
                                        as='select'
                                        value={item.qty}
                                        onChange={(e) =>
                                            dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                            )

                                        }>

                                        {
                                            [...Array(item.CountInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>

                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() =>
                                        removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>

                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Sub Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>

                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>

    </Row >

}

export default CartScreen