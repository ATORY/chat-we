import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import App from 'App'
import { store, history } from 'store'


  // store.dispatch({
  //   type: SET_USER,
  //   user,
  // });
  // if (!user.mobile) store.dispatch(push('/login'));
  // else if (store.dispatch(push('/'));
  // ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
// }).catch((err) => {
//   console.error(err);
//   document.getElementById('root').innerHTML = '<h1>Err</h1>';
// });



