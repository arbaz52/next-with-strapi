import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Breadcrumb, BreadcrumbItem, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { _getProduct } from '../../redux/product/actions'

import { motion } from 'framer-motion'

const SingleProductPage = () => {
    const router = useRouter()
    const { id } = router.query
    const productStore = useSelector(store => store.product)
    const dispatch = useDispatch()
    useEffect(() => {
        if (
            !productStore.product ||
            productStore.product.id != id) {
            console.log("fetching product")
            dispatch(_getProduct(id))
        }
    }, [])



    const [quantityToBeAddedToCart, setQuantityToBeAddedToCart] = useState(1)



    return (
        <div className="container py-5">
            {productStore.product ? (

                <div className="row">
                    <div className="col-sm-12 col-md-4 text-center my-auto">
                        <img src={productStore.product.image} style={{ maxHeight: "80vh", maxWidth: "100%", objectFit: "contain", objectPosition: "center" }} alt="" className="img-fluid" />
                    </div>
                    <div className="col-sm-12 col-md-8">

                        <Breadcrumb>
                            <BreadcrumbItem>
                                <small>Products</small>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <small>{productStore.product.category}</small>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <small>{productStore.product.title}</small>
                            </BreadcrumbItem>
                        </Breadcrumb>

                        <b className="text-primary text-capitalize">{productStore.product.category}</b>
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
                            <h3>{productStore.product.title}</h3>
                        </motion.div>
                        <p>{productStore.product.description}</p>
                        <h4 className="mb-4">
                            <span>Price: </span>
                            <b className="text-primary">${productStore.product.price}</b>
                        </h4>
                        <div className="col-6 p-0">
                            <InputGroup>
                                <InputGroupText>
                                    <small>Subtotal: ${(quantityToBeAddedToCart * productStore.product.price).toFixed(3)}</small>
                                </InputGroupText>
                                <Input value={quantityToBeAddedToCart} onChange={e => setQuantityToBeAddedToCart(e.target.value)} type="number" min="1" />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary">Add to cart</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
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