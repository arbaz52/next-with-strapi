const { LOAD_PRODUCT, LOAD_PRODUCT_SUCCESSFUL, LOAD_PRODUCT_FAILED } = require("./types")

const initialState = {
    product: null,
    loading: false,
    error: null,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCT:
            return { ...state, error: null, loading: true }
            break

        case LOAD_PRODUCT_SUCCESSFUL:
            return { ...state, error: null, loading: false, product: action.payload }
            break

        case LOAD_PRODUCT_FAILED:
            return { ...state, error: action.payload, loading: false }
            break

        default:
            return initialState
    }
}

export default productReducer