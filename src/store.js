import { createContext } from 'react';
import { createBrowserHistory } from 'history'
import { configureStore, getDefaultMiddleware } from "redux-starter-kit"
// import { applyMiddleware } from "redux"
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'

const preloadedState = {
};

export const history = createBrowserHistory()

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState
});

export const ChatContext = createContext(null);
