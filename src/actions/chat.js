import { SELECT_CHAT_WITH, SEND_MESSAGE } from 'constant'

export const selectChat = chatWith => (dispatch, getState) => {
  // console.log(chatWith)
  // if (getState().products.byId[productId].inventory > 0) {
  dispatch({
    type: SELECT_CHAT_WITH,
    chatWith
  })
  // }
}

export const sendMessage = (socket, to, msg) => (dispatch, getState) => {
  const time = Date.now();
  socket.emit("message", {
    from: localStorage.getItem("phone"),
    to,
    data: { msg, time }
  });
  dispatch({
    type: SEND_MESSAGE,
    data: { msg, time }
  })
}
