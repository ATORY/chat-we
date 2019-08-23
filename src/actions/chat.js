import { SELECT_CHAT_WITH, SEND_MESSAGE } from 'constant'

export const selectChat = currentWith => (dispatch, getState) => {
  // console.log(chatWith)
  // if (getState().products.byId[productId].inventory > 0) {
  dispatch({
    type: SELECT_CHAT_WITH,
    currentWith
  })
  // }
}

export const sendMessage = (socket, to, msg) => (dispatch, getState) => {
  const time = Date.now();
  socket.emit("message", {
    // from: localStorage.getItem("token"),
    to,
    data: { msg, time }
  });
  dispatch({
    type: SEND_MESSAGE,
    data: { msg, time }
  })
}
