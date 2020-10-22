const { LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESSFUL, LOAD_PRODUCTS_FAILED } = require("./types")

const initialState = {
    products: null,
    loading: false,
    error: null,
    categories: null
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...state, error: null, loading: true }
            break

        case LOAD_PRODUCTS_SUCCESSFUL:
            const categories = action.payload.reduce((p, c, i, arr) => {
                console.log(p, c, i, arr)
                if (p.indexOf(c.category) == -1)
                    return [...p, c.category]
                return p
            }, [])
            return { ...state, error: null, loading: false, products: action.payload, categories }
            break

        case LOAD_PRODUCTS_FAILED:
            return { ...state, error: action.payload, loading: false }
            break

        default:
            return initialState
    }
}

export default productsReducer