# STEP 1 Create Store
```
import { legacy_createStore as createStore } from 'redux'

const store = createStore()

export default store 
```


# STEP 2 Create Reducer
```
const accountReducer = (state = 0, action) => {
    switch(action.type) {
        case "deposit":
            return state + action.payload
        case "withdraw":
            return state - action.payload
        default:
            return state
    }
}

export default accountReducer
```


# STEP 3 Combine Potential Reducers & Add DevTool Functionality 
```
import { legacy_createStore as createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import rootReducer from './reducers'

const store = createStore(rootReducer, devToolsEnhancer())


export default store 
```


# Providing Global State to React App
```
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import store from "./store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

# Accessing Data From The Store
```

import { useSelector } from 'react-redux'

const App = () => {
  const account = useSelector(state => state.accountReducer)
  console.log("app.jsx", account)

  return (
    <div className="App">
      <h1>Account: {account}</h1>
      <button>Deposit</button>
      <button>Withdraw</button>
    </div>
  );
}

export default App;
```


# Create the Action Creators
```
export const depositMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "deposit",
            payload: amount
        })
    }
}

export const withdrawMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "withdraw",
            payload: amount
        })
    }
}
```

# Exported action creators
## Bundled together
```
export * as accountActionCreators from "./accountActionCreators"
```

# Import action creators into App.jsx
```
import { accountActionCreators } from "./action-creators"
```


# Bind action creators, and pass 'dispatch' functionality... finally destructure
```
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { accountActionCreators } from "./action-creators"


const App = () => {

  // Accessing global state
  const account = useSelector(state => state.accountReducer)

  // Updating global state
  const dispatch = useDispatch()
  const { depositMoney, withdrawMoney } = bindActionCreators(accountActionCreators, dispatch)



  return (
    <div className="App">
      <h1>Account: {account}</h1>
      <button>Deposit</button>
      <button>Withdraw</button>
    </div>
  );
}

export default App;
```

# Add Redux-Thunk to resolve async dispatch issues. 
## Imported additional middleware from redux to impliment thunk
```
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const store = createStore(rootReducer, devToolsEnhancer(), applyMiddleware(thunk))


export default store 
```


# Updated middleware to bundle functionality together
```
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const composedFunctions = composeWithDevTools(...[applyMiddleware(thunk)])

const store = createStore(rootReducer, composedFunctions)


export default store 
```