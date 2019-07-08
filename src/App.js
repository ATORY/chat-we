import React, { useReducer } from 'react';
import styled, { createGlobalStyle } from 'styled-components'

import { ChatContext, reducer, initialState } from './ChatState';
import logo from './logo.svg';
import defaultAvator from './account.svg'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
  .electron-drag {
    -webkit-app-region: 'drag'
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

const Nav = styled.nav`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  overflow-y: scroll;
  background-color: #000;
  padding-top: 30px;
  padding-bottom: 20px;
  & .avator {
    background: gray;
    display: inline-block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
  }
  & .App-logo {
    width: 60px;
    /* align-self: flex-end; */
    justify-self: flex-end;
  }
`

const ASide = styled.div`
  width: 230px;
  border: 1px solid #d3d3d3;
  border-top: none;
  border-bottom: none;
  overflow-y: scroll;
`

const Main = styled.main`
  flex-grow: 1;
  overflow-y: scroll;
`

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ dispatch, ...state }}>
      <GlobalStyle />
      <AppContainer>
        <Nav>
          <img src={defaultAvator} className="avator" alt="avator" />
          <img src={logo} className="App-logo" alt="logo" />
        </Nav>
        <ASide></ASide>
        <Main></Main>
      </AppContainer>
    </ChatContext.Provider>
  );
}

export default App;
