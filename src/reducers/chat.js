// import { store } from 'store'
import { SELECT_CHAT_WITH, SOCKET_MESSAGES, SEND_MESSAGE, INIT_CHAT_WITH } from 'constant'

const chatReducer = (state = {
  chats: [
    {
      id: '',
      type: '',
      name: '',
      chatMsg: []
    },
  ],
  currentWith: ''
}, action) => {
  switch (action.type) {
    case INIT_CHAT_WITH: {
      return {
        chats: action.chats,
        currentWith: action.chats[0].id
      }
    }
    case SELECT_CHAT_WITH: {
      // console.log(state)
      return {
        chats: state.chats,
        currentWith: action.currentWith
      }
    }
    case SOCKET_MESSAGES: {
      console.log(action.data);
      const { from, msg } = action.data;
      const _currentWith = {...state.currentWith}
      if (_currentWith.id === from) {
        _currentWith.chatMsg = [..._currentWith.chatMsg, { msg: msg.data, type: 1, time: Date.now() }];
        const index = state.chats.findIndex(item => {
          return item.id === _currentWith.id
        });
        const _chats = [
          ...state.chats.slice(0, index),
          _currentWith,
          ...state.chats.slice(index + 1),
        ]
        return {
          chats: _chats,
          currentWith: _currentWith,
        }
      }
      const index = state.chats.findIndex(item => {
        return item.id === from
      });
      let chatWith = {...state.chats[index]};
      chatWith.chatMsg = [...chatWith.chatMsg, { msg: msg.data, type: 1, time: Date.now() }];
      const _chats = [
        ...state.chats.slice(0, index),
        chatWith,
        ...state.chats.slice(index + 1),
      ]
      return {
        chats: _chats,
        currentWith: _currentWith,
      }
    }
    case SEND_MESSAGE: {
      console.log(action.data);
      const index = state.chats.findIndex(item => {
        return item.id === state.currentWith
      });
      const _currentWith = {...state.chats[index]}
      _currentWith.chatMsg = [..._currentWith.chatMsg ,{...action.data, type: 0 }];
      
      const _chats = [
        ...state.chats.slice(0, index),
        _currentWith,
        ...state.chats.slice(index + 1),
      ]
      return {
        chats: _chats,
        currentWith: state.currentWith,
      }
    }
    default:
      return state
  }
}

export default chatReducer
