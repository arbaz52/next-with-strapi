const { ADD_TO_CART, UPDATE_QUANTITY, REMOVE_FROM_CART, LOAD_FROM_LOCAL_STORAGE } = require("./types")

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

const loadFromLocalStorage = (id) => {
    return {
        type: LOAD_FROM_LOCAL_STORAGE
    }
}

export {
    addToCart,
    updateQuantity,
    removeFromCart,
    loadFromLocalStorage
}