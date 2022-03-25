import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import Product from '../components/Product'

const ProductScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const { id } = useParams()
    // const product = products.find((p) => p._id === id)

    useEffect(() => {
        dispatch(listProductDetails(id))

    }, [dispatch, id]) //it also works without this match dependencies on line 24

    let navigate = useNavigate();
    const addToCartHandler = () => {
        // history.push(`/cart/${match.params.id}?qty=${qty}`) //react router lower than v6
        navigate(`/cart/${id}?qty=${qty}`) //use navigate in v6
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {/* {product ? product : 'Product not found!'} */}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                <Row>
                    <Col md={6}>

                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item >
                                <h3> {product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />

                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price :  ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description :  {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:
                                        </Col>
                                        <Col>
                                            {/* <strong> */}
                                            {product.CountInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            {/* </strong> */}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.CountInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>

                                                    {
                                                        [...Array(product.CountInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}


                                <ListGroup.Item>
                                    <div className="d-grid gap-2">
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn btn-block"
                                            disabled={product.CountInStock === 0}>
                                            Add To Cart
                                        </Button>
                                    </div>
                                    {/* <Button className='btn btn-block' type='button'>Add To Cart</Button> */}
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}


        </>
    )
}

export default ProductScreen