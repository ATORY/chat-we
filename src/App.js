import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import Explore from 'components/Explore'
import Chat from 'components/Chat'
import Connector from 'components/Connector'
import Home from 'components/Home'
import ErrorPage from 'components/Error'
import NoMatch from 'components/NoMatch'
import NavBar from 'components/NavBar'
import Login from 'components/Login'
import initSocket from 'api/socketIO'
import { ChatContext, store } from 'store'
import { AUTHORIZATION_ERR } from 'constant'
import api from 'api'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
  .electron-drag {
    -webkit-app-region: 'drag'
  }

  span svg {
    vertical-align: bottom;
  }
`

const AppContainer = styled.div`
  display: flex;
  align-items: stretch;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #eeeeee;
`

function App({ history, base }) {
  const [socket, setSocket] = useState('');
  const [initDone, setInitDone] = useState(false);
  useEffect(() => {
    console.log(base)
    if (base.auth > -1 && !socket) setSocket(initSocket({ token: localStorage.getItem('token') || '' }));
  }, [base])

  useEffect(() => {
    api.initAuth().then((result) => {
      setInitDone(true);
      if (typeof result === 'string') {
        console.log('auth err')
        store.dispatch({
          type: AUTHORIZATION_ERR
        });
        store.dispatch(push('/login'));
      } else {  
        store.dispatch(push('/error'));
      }
    })
  }, [])
  

  return (
    <ChatContext.Provider value={{ socket }}>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        {initDone ? (
          <AppContainer>
            <NavBar />
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/" render={() => (
                <Redirect to="/chat"/>
              )}/>
              <Route path="/chat" component={Chat} />
              <Route path="/connector" component={Connector} />
              <Route path="/explore" component={Explore} />
              <Route path="/login" component={Login} />
              <Route path="/error" component={ErrorPage} />
              <Route component={NoMatch} />
            </Switch>
          </AppContainer>
        ) : (
          <div>Init</div>
        )}
      </ConnectedRouter>
    </ChatContext.Provider>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

const mapStateToProps = state => ({
  base: state.base,
})

export default connect(
  mapStateToProps,
)(App)

