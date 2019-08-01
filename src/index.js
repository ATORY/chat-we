import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import App from 'App'
import { store, history } from 'store'

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
