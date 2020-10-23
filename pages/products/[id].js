import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Breadcrumb, BreadcrumbItem, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { _getProduct } from '../../redux/product/actions'

import { motion } from 'framer-motion'
import StripeCheckout from 'react-stripe-checkout'
import { Formik } from 'formik'
import { addToCart } from '../../redux/cart/actions'

const SingleProductPage = () => {
    const router = useRouter()
    const { id } = router.query
    const productStore = useSelector(store => store.product)
    const dispatch = useDispatch()
    
    
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (
            !productStore.product ||
            productStore.product.id != id) {
            console.log("fetching product")
            dispatch(_getProduct(id))
        }else{
            setProduct(productStore.product)
        }
    }, [productStore.product])



    const [quantityToBeAddedToCart, setQuantityToBeAddedToCart] = useState(1)


    const _addToCart = (e) => {
        e.preventDefault()
        dispatch(addToCart(productStore.product, quantityToBeAddedToCart))
    }


    return (
        <div className="container py-5">
            {product ? (

                <div className="row">
                    <div className="col-sm-12 col-md-4 text-center my-auto">
                        <img src={product.image} style={{ maxHeight: "80vh", maxWidth: "100%", objectFit: "contain", objectPosition: "center" }} alt="" className="img-fluid" />
                    </div>
                    <div className="col-sm-12 col-md-8">

                        <Breadcrumb>
                            <BreadcrumbItem>
                                <small>Products</small>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <small>{product.category}</small>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <small>{product.title}</small>
                            </BreadcrumbItem>
                        </Breadcrumb>

                        <b className="text-primary text-capitalize">{product.category}</b>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 100
                                }, visible: {
                                    opacity: 1,
                                    y: 0
                                }
                            }} >
                            <h3>{product.title}</h3>
                        </motion.div>
                        <p>{product.description}</p>
                        <h4 className="mb-4">
                            <span>Price: </span>
                            <b className="text-primary">${product.price}</b>
                        </h4>
                        <div className="col-6 p-0">
                            <InputGroup>
                                <InputGroupText>
                                    <small>Subtotal: ${(quantityToBeAddedToCart * product.price).toFixed(3)}</small>
                                </InputGroupText>
                                <Input value={quantityToBeAddedToCart} onChange={e => setQuantityToBeAddedToCart(e.target.value)} type="number" min="1" />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary"
                                    onClick={_addToCart}>Add to cart</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>

                        {/* QUICK BUY */}
                        <div className="mt-4"></div>
                        <StripeCheckout
                            // callback
                            //TODO: ADD STRIPE KEY
                            token=""
                            stripeKey=""
                        >
                            <Button color="primary">Quick Buy!</Button>
                        </StripeCheckout>
                    </div>
                </div>
            ) : (
                    <div className="alert alert-info">Please wait, loading product information!</div>
                )
            }
        </div >
    )
}

export default SingleProductPage