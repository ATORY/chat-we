import React, { useReducer, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components'

import { ChatContext, reducer, initialState } from './ChatState';
import Nav from './Nav'
import ASide from './ASide'
import Main from './Main'
import initSocket from './socketIO'

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

function PreApp() {
  const [check, setCheck] = useState(false)
  const [phone, setPhone] = useState('');
  if (!check) {
    return (
      <AppContainer>
        <div>
          <input value={phone} onChange={(e) => {setPhone(e.target.value)}} />
          <button onClick={() => {
            if (phone.length !== 11) return;
            setCheck(true)
          }}>OK</button>
        </div>
      </AppContainer>
    )
  }
  return <App phone={phone} />
}

function App({ phone }) {
  const [socketStatus, setSocketStatus] = useState('');
  const [socket, setSocket] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setSocket(initSocket(phone, { dispatch, watchSocketStatus: setSocketStatus }));
  }, [])

  console.log({ socketStatus })
  return (
    <ChatContext.Provider value={{ dispatch, ...state, socket }}>
      <GlobalStyle />
      <AppContainer>
        <Nav dispatch={dispatch} {...state.nav} socketStatus={socketStatus} />
        <ASide />
        <Main phone={phone} />
      </AppContainer>
    </ChatContext.Provider>
  );
}

export default PreApp;
