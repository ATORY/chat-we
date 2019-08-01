import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import Explore from 'components/Explore'
import Chat from 'components/Chat'
import Connector from 'components/Connector'
import NoMatch from 'components/NoMatch'
import NavBar from 'components/NavBar'
import initSocket from 'api/socketIO'
import { ChatContext } from 'store'

console.log(Chat)

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

function App({ history }) {
  const [socket, setSocket] = useState('');

  useEffect(() => {
    setSocket(initSocket('userID'));
  }, [])

  return (
    <ChatContext.Provider value={{ socket }}>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <AppContainer>
          <NavBar />
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/connector" component={Connector} />
            <Route path="/explore" component={Explore} />
            <Route component={NoMatch} />
          </Switch>
        </AppContainer>
      </ConnectedRouter>
    </ChatContext.Provider>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
