import { store } from 'store'
import { SELECT_CHAT_WITH } from 'constant'

const chatReducer = (state = {
  withChats: [
    {
      id: '1',
      type: 'room',
      name: 'testRoom',
      chatMsg: []
    },
    {
      id: '2',
      type: 'person',
      name: 'testPersion',
      chatMsg: []
    }
  ],
  currentWith: {
    id: '1',
    type: 'room',
    name: 'testRoom',
    chatMsg: []
  },
}, action) => {
  switch (action.type) {
    case SELECT_CHAT_WITH: {
      // console.log(state)
      return {
        withChats: state.withChats,
        currentWith: action.chatWith
      }
    }
    default:
      return state
  }
}

export default chatReducer
