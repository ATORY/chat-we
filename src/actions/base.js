import { push } from 'connected-react-router';

import { SELECT_CHAT_WITH, USER_LOGIN, VISITOR_LOGIN, JUST_LOOK } from 'constant'

import api from 'api'

export const login = chatWith => (dispatch, getState) => {
  // console.log(chatWith)
  // if (getState().products.byId[productId].inventory > 0) {
  dispatch({
    type: SELECT_CHAT_WITH,
    chatWith
  })
  // }
}

export const loginASVisitor = () => async (dispatch, getState) => {
  const visitor = await api.loginASVisitor()
  // console.log({ visitor })
  const { token } = visitor;
  if (token) localStorage.setItem('token', token)
  dispatch({
    type: VISITOR_LOGIN,
    visitor
  })
  dispatch(push('/'))
}

export const justLook = () => (dispatch, getState) => {
  dispatch({
    type: JUST_LOOK,
  })
}
