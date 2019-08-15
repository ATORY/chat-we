import { VISITOR_LOGIN } from 'constant'

export default (state = {
  connector: [],// 我的联系人，广场上发言的不在我的联系人里，为陌生人？可点进详情，还可以 from { baseInfo }
  info: {},     // wode 信息, 可以是游客（随机人）
  auth: -1,     // 
  token: localStorage.getItem('token') || ''
}, action) => {
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
