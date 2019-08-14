import { SOCKET_STATUS } from 'constant'

export default (state = 'init', action) => {
  switch (action.type) {
    case SOCKET_STATUS:
      return action.status
    default:
      return state
  }
}
