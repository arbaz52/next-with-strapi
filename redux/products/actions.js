import axios from 'axios'
const { LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESSFUL, LOAD_PRODUCTS_FAILED } = require("./types")

const loadProducts = () => {
    return {
        type: LOAD_PRODUCTS
    }
}
const loadProductsSuccessful = (products) => {
    return {
        type: LOAD_PRODUCTS_SUCCESSFUL,
        payload: products
    }
}
const loadProductsFailed = (error) => {
    return {
        type: LOAD_PRODUCTS_FAILED,
        payload: error.message
    }
}

const _getProducts = () => {
    return (dispatch) => {
        dispatch(loadProducts())
        axios.get("/api/products/")
        .then(res => {
            console.log(res)
            dispatch(loadProductsSuccessful(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(loadProductsFailed(err))
        })
    }
}



export {
    loadProducts,
    loadProductsSuccessful,
    loadProductsFailed,


    _getProducts
}