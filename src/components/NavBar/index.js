import React from "react";
// import PropTypes from "prop-types"
import { connect } from 'react-redux'
import styled from "styled-components";
import { NavLink, withRouter } from 'react-router-dom'

import logo from "./logo.svg";
import defaultAvator from "./account.svg";

const Nav = styled.nav`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* overflow-y: scroll; */
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  padding-top: 30px;
  padding-bottom: 20px;
  & .is-active {
    fill: #03a9f4
  }
  & .avator {
    background: gray;
    display: inline-block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    min-height: 40px;
    border: 1px solid #fff;
  }
  & .App-logo {
    width: 60px;
    animation: App-logo-spin infinite 20s linear;
    margin-top: auto;
    /* align-self: flex-end; */
    justify-self: flex-end;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  & > div {
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    justify-items: center;

    & span {
      padding: 10px;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      display: inline-block;
    }
  }
`;

function Index({ socketStatus }) {
  return (
    <Nav>
      <img src={defaultAvator} className="avator" alt="avator" />
      <div>
        <NavLink to="/chat" strict activeClassName='is-active'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>
        </NavLink>
        <NavLink to="/connector" strict activeClassName='is-active'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </span>
        </NavLink>
        <NavLink to="/explore" strict activeClassName='is-active'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/><path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>
        </NavLink>
      </div>
      <img src={logo} className="App-logo" alt="logo" />
      <span style={{ color: "#ddd", fontSize: '12px' }}>{socketStatus}</span>
    </Nav>
  );
}

const mapStateToProps = state => ({
  socketStatus: state.socketStatus,
})

export default withRouter(connect(mapStateToProps, null)(Index))
