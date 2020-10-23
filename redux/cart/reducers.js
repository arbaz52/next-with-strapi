import { updateQuantity } from "./actions"

const { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } = require("./types")

const initialState = []

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const { product, quantity } = action.payload
                const exists = state.filter(_entry => _entry.product.id == product.id).length > 0
                if (exists) {
                    return cartReducer(state, 
                        updateQuantity(
                            product.id,
                            state.filter(_entry => _entry.product.id == product.id)[0].quantity + quantity
                        )
                    )
                }
                return [{
                    product, quantity
                }, ...state]
            }

        case UPDATE_QUANTITY:
            {
                const { id, quantity } = action.payload
                return state.map(_entry => {
                    return _entry.product.id == id ? { ..._entry, quantity } : _entry
                })
            }

        case REMOVE_FROM_CART:
            {
                const id  = action.payload
                return state.filter(_entry => _entry.product.id != id)
            }

        default:
            return state
    }
}

export default cartReducer