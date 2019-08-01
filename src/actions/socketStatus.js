import { store } from 'store'

export const watchSocketStatus = (status) => {
  console.log({ status })
  store.dispatch({
    type: status
  })
}
