import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { removeFromCart, updateQuantity } from '../redux/cart/actions'

const CartPage = () => {


    const cartStore = useSelector(store => store.cart)
    const dispatch = useDispatch()

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col">
                    <h1>
                        <b>Your Cart</b>
                    </h1>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum pariatur, harum error voluptatibus eligendi.</p>
                </div>
            </div>
            <div className="row">
                {/* wrapper */}
                <div className="col-sm-12 col-md-6">
                    {
                        cartStore.map(entry => {
                            const { product, quantity } = entry
                            return (
                                <div className="row mb-4" key={product.id}>
                                    <div className="col-3">
                                        <img src={product.image} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-6 d-flex justify-content-between flex-column ">

                                        <div className="mb-3">
                                            <div title={product.title} className="title"><small><b>
                                                {product.title.substr(0, 30)}{product.title.length > 30 ? '...' : ''}
                                            </b></small></div>
                                            <div title={product.description} className="description text-muted"><small>{product.description.substr(0, 30)}...</small></div>
                                        </div>

                                        <div className="" style={{ fontSize: "0.1em" }}>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <small>${(quantity * product.price).toFixed(3)}</small>
                                                </InputGroupText>
                                                <Input bsSize="sm" value={quantity} onChange={e => dispatch(updateQuantity(product.id, e.target.value))} type="number" min="1" />
                                            </InputGroup>
                                        </div>

                                    </div>
                                    <div className="col d-flex align-items-end justify-content-between flex-column text-right">
                                        <b>${product.price}</b>
                                        <br />
                                        <Button size="sm" color="danger" onClick={e=> dispatch(removeFromCart(product.id))}><small>Remove</small></Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CartPage