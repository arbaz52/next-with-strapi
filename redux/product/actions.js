import axios from 'axios'
const { LOAD_PRODUCT, LOAD_PRODUCT_SUCCESSFUL, LOAD_PRODUCT_FAILED } = require("./types")

const loadProduct = () => {
    return {
        type: LOAD_PRODUCT
    }
}
const loadProductSuccessful = (product) => {
    return {
        type: LOAD_PRODUCT_SUCCESSFUL,
        payload: product
    }
}
const loadProductFailed = (error) => {
    return {
        type: LOAD_PRODUCT_FAILED,
        payload: error.message
    }
}

const _getProduct = (id) => {
    return (dispatch) => {
        dispatch(loadProduct())
        axios.get(`/api/products/${id}`)
        .then(res => {
            // console.log(res)
            dispatch(loadProductSuccessful(res.data))
        })
        .catch(err => {
            // console.log(err)
            dispatch(loadProductFailed(err))
        })
    }
}



export {
    loadProduct,
    loadProductSuccessful,
    loadProductFailed,


    _getProduct
}