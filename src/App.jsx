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
      <button onClick={() => depositMoney(1000)}>Deposit</button>
      <button onClick={() => withdrawMoney(1000)}>Withdraw</button>
    </div>
  );
}

export default App;
