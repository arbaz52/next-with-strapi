import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItems, CartSummary } from '../components/Cart/Cart'

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
                    <CartItems cartStore={cartStore} dispatch={dispatch} />
                </div>
                <div className="col border-left">
                    <h4 className="mb-3"><b>Your Order Summary</b></h4>
                    <CartSummary cartStore={cartStore} />
                </div>
            </div>
        </div>
    )
}

export default CartPage