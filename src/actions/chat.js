import { SELECT_CHAT_WITH } from 'constant'

export const selectChat = chatWith => (dispatch, getState) => {
  // console.log(chatWith)
  // if (getState().products.byId[productId].inventory > 0) {
  dispatch({
    type: SELECT_CHAT_WITH,
    chatWith
  })
  // }
}
