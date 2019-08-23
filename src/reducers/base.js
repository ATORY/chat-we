import { VISITOR_LOGIN, USER_LOGIN, INIT_CHAT_WITH } from 'constant'
import { store } from 'store'
import api from 'api'


export default (state = {
  connector: [],// 我的联系人，广场上发言的不在我的联系人里，为陌生人？可点进详情，还可以 from { baseInfo }
  info: {},     // wode 信息, 可以是游客（随机人）
  auth: -1,     // 
  token: localStorage.getItem('token') || ''
}, action) => {
  if (action.type === VISITOR_LOGIN || action.type === USER_LOGIN) {
    withLogin()
  }
  switch (action.type) {
    case VISITOR_LOGIN: {
      const { visitor } = action
      return {
        ...state,
        ...visitor
      }
    }
    default: 
      return state
  }
}

function withLogin() {
  // 获取用户chat
  api.usersChat().then(({ chats }) => {
    store.dispatch({
      type: INIT_CHAT_WITH,
      chats
    })
  });
}
