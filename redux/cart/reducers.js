import { updateQuantity } from "./actions"

const { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, LOAD_FROM_LOCAL_STORAGE, EMPTY_CART } = require("./types")

const initialState = []

const _cartReducer = (state, action) => {
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
                const id = action.payload
                return state.filter(_entry => _entry.product.id != id)
            }

        case LOAD_FROM_LOCAL_STORAGE:
            {
                let _cart = loadInfoFromLocalStorage()
                if (_cart)
                    return _cart
                return [...state, ]
            }


        case EMPTY_CART:
            {
                return []
            }

        default:
            return state
    }
}

// persistant cart
let loadedFromLocalStorage = false
const isServer = typeof window === "undefined"

const cartReducer = (state = initialState, action) => {
    const nextState = _cartReducer(state, action)
    storeInLocalStorage(nextState)
    return nextState
}

const KEY_LS_CART = "KEY_LS_CART"

const storeInLocalStorage = (state) => {
    //storing to localStorage on update
    if (!isServer && loadedFromLocalStorage)
        localStorage.setItem(KEY_LS_CART, JSON.stringify(state))
}
const loadInfoFromLocalStorage = () => {
    if (!isServer) {
        loadedFromLocalStorage = true
        let cart = localStorage.getItem(KEY_LS_CART)
        if (cart) {
            cart = JSON.parse(cart)
            return cart
        }
    }
    return null
}



export default cartReducer