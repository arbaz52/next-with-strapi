import productReducer from "./product/reducers";
import productsReducer from "./products/reducers";

const { createStore, applyMiddleware, combineReducers, compose } = require("redux");
const { default: logger } = require("redux-logger");
const { default: thunk } = require("redux-thunk");

const rootReducer = combineReducers({
    products: productsReducer,
    product: productReducer
})
const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

export default store