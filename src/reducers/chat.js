// import { store } from 'store'
import { SELECT_CHAT_WITH, SOCKET_MESSAGES, SEND_MESSAGE } from 'constant'

const chatReducer = (state = {
  withChats: [
    {
      id: '12345678910',
      type: 'room',
      name: 'testRoom',
      chatMsg: []
    },
    {
      id: '12345678901',
      type: 'person',
      name: '12345678901',
      chatMsg: []
    },
    {
      id: '12345678902',
      type: 'person',
      name: '12345678902',
      chatMsg: []
    }
  ],
  // TODO: currentWith just id in withChats
  currentWith: {
    id: '12345678910',
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
    case SOCKET_MESSAGES: {
      console.log(action.data);
      const { from, msg } = action.data;
      const _currentWith = {...state.currentWith}
      if (_currentWith.id === from) {
        _currentWith.chatMsg = [..._currentWith.chatMsg, { msg: msg.data, type: 1, time: Date.now() }];
        const index = state.withChats.findIndex(item => {
          return item.id === _currentWith.id
        });
        const _withChats = [
          ...state.withChats.slice(0, index),
          _currentWith,
          ...state.withChats.slice(index + 1),
        ]
        return {
          withChats: _withChats,
          currentWith: _currentWith,
        }
      }
      const index = state.withChats.findIndex(item => {
        return item.id === from
      });
      let chatWith = {...state.withChats[index]};
      chatWith.chatMsg = [...chatWith.chatMsg, { msg: msg.data, type: 1, time: Date.now() }];
      const _withChats = [
        ...state.withChats.slice(0, index),
        chatWith,
        ...state.withChats.slice(index + 1),
      ]
      return {
        withChats: _withChats,
        currentWith: _currentWith,
      }
    }
    case SEND_MESSAGE: {
      console.log(action.data);
      const _currentWith = {...state.currentWith}
      _currentWith.chatMsg = [..._currentWith.chatMsg, {...action.data, type: 0 }];
      const index = state.withChats.findIndex(item => {
        return item.id === _currentWith.id
      });
      const _withChats = [
        ...state.withChats.slice(0, index),
        _currentWith,
        ...state.withChats.slice(index + 1),
      ]
      return {
        withChats: _withChats,
        currentWith: _currentWith,
      }
    }
    default:
      return state
  }
}

export default chatReducer
