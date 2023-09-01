import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const composedFunctions = composeWithDevTools(...[applyMiddleware(thunk)])

const store = createStore(rootReducer, composedFunctions)


export default store 