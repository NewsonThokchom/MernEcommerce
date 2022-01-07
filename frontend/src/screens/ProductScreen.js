import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
import axios from 'axios'
// import Product from '../components/Product'

const ProductScreen = ({ match }) => {

    const { id } = useParams()
    // const product = products.find((p) => p._id === id)

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }

        fetchProduct()

    }, [match]) //it also works without this match dependencies on line 24


    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {/* {product ? product : 'Product not found!'} */}
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
                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className="d-grid gap-2">
                                    <Button className="btn btn-block" disabled={product.countInStock === 0}>Add To Cart</Button>
                                </div>
                                {/* <Button className='btn btn-block' type='button'>Add To Cart</Button> */}
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default ProductScreen