import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import products from './products'
import logs from './logs'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
      products,
      logs
  })

export default createRootReducer
