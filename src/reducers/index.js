import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chatReducer from './chat'
import socketStatusReducer from './socketStatus';
import baseReducer from './base';

const rootReducer = (history) => combineReducers({
  base: baseReducer,
  chat: chatReducer,
  socketStatus: socketStatusReducer,
  router: connectRouter(history)
})

export default rootReducer
