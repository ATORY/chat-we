import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chatReducer from './chat'
import socketStatusReducer from './socketStatus';

const rootReducer = (history) => combineReducers({
  chat: chatReducer,
  socketStatus: socketStatusReducer,
  router: connectRouter(history)
})

export default rootReducer
