import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button, Input, InputGroup, InputGroupText } from 'reactstrap'
import { emptyCart, removeFromCart, updateQuantity } from '../../redux/cart/actions'
import axios from 'axios'
import { toast } from 'react-toastify'

const calculateTotal = (cartStore) => {
    return cartStore.reduce((p, c, i, arr) => {
        return c.product.price * c.quantity + p
    }, 0).toFixed(3)
}

const CartItems = ({ cartStore, dispatch }) => {
    return (
        cartStore.length > 0 ?
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
                            <Button size="sm" color="danger" onClick={e => dispatch(removeFromCart(product.id))}><small>Remove</small></Button>
                        </div>
                    </div>
                )
            })
            :
            (
                <div className="alert alert-info">Your cart is empty, please add some items to cart!</div>
            )
    )
}

const CartSummary = ({ cartStore, dispatch }) => {
    const handleCheckout = (token) => {
        axios.post("/api/orders/checkout", {token, cart: cartStore})
        .then(res => {
            toast.success("Payment successful! Your order is on the way!")
            dispatch(emptyCart())
            console.log(res)
        })
        .catch(err => {
            toast.error("Error occured while processing the payment! Order was not placed")
            console.log(err)
        })
        console.log(token)
    }
    return (
        cartStore.length > 0 ?
            <table className="table table-borderless">
                <tbody>
                    <tr>
                        <td>Total Products</td>
                        <td className="text-right"><b>${calculateTotal(cartStore)}</b></td>
                    </tr>
                    <tr>
                        <td>Let's purchase</td>
                        <td className="text-right">
                            <StripeCheckout 
                                token={handleCheckout}
                                stripeKey="pk_test_51HeypfL9vowMRDDJ8F7zCzT7sDI9iYIK7LmcAGuLU4Rdrl0viLjf4RHmb2i8F9tvuH2enMuwzOxLjZQm1FfP5Sxl00CUpLOajx"
                            >
                                <Button size="sm" color="primary">Pay with credit card</Button>
                                </StripeCheckout>
                        </td>
                    </tr>
                </tbody>
            </table>
            :
            (
                <div className="alert alert-info">Your cart is empty, please add some items to cart!</div>
            )
    )
}


export { CartItems, CartSummary, calculateTotal }