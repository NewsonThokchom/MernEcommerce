import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


//combineReducers turns an object whose values are different reducer functions,into a single reducer function.
//It will call every child reducer,and gather their results into a single state object,
// whose keys correspond to the key of the passed reducer function 
const reducer = combineReducers({})

const initialState = {}

const middleware = [thunk]

//createStore holds the state tree
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store