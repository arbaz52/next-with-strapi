const { ADD_TO_CART, UPDATE_QUANTITY, REMOVE_FROM_CART } = require("./types")

const addToCart = (product, quantity) => {
    return {
        type: ADD_TO_CART,
        payload: {
            product, quantity: parseInt(quantity)
        }
    }
}

const updateQuantity = (id, quantity) => {
    return {
        type: UPDATE_QUANTITY,
        payload: {
            id, quantity: parseInt(quantity)
        }
    }
}

const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id
    }
}

export {
    addToCart,
    updateQuantity,
    removeFromCart
}