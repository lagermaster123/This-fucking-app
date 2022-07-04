import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducers
import { cartReducer } from './reducers/cartReducers'
import { getCategoriesReducer, getProductsReducer, getProductDetailsReducer } from './reducers/productReducers'
import userReducer from './reducers/userSlice'

const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    getCategories: getCategoriesReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer
})

const middleware = [thunk]; 

const cartFromLocalStorage = (
    localStorage.getItem("cart") 
        ? JSON.parse(localStorage.getItem("cart")) 
        : []
)

const userFromLocalStorage = (
    localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
)

const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    },
    user: {
        user: userFromLocalStorage
    }
}

const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;