import { store } from 'store'
import { SOCKET_MESSAGES, SOCKET_ROOM_JOINED, SOCKET_CHAT } from 'constant'

export const watchSocketStatus = (status) => {
  console.log({ status })
  store.dispatch({
    type: status
  })
}

export const onChat = msg => {
  store.dispatch({
    type: SOCKET_CHAT,
    data: msg
  })
}

export const onSocketMessages = (msg) => {
  store.dispatch({
    type: SOCKET_MESSAGES,
    data: msg
  })
}

export const onRoomJioned = (msg) => {
  store.dispatch({
    type: SOCKET_ROOM_JOINED,
    data: msg
  })
}
