import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Messager from "./Messager";

import { selectChat } from 'actions/chat'


const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const ASide = styled.aside`
  width: 230px;
  background: white;
  position: relative;
  /* border: 1px solid #d3d3d3; */
  border-top: none;
  border-bottom: none;
  overflow-y: scroll;

  & a {
    text-decoration: none;
  }
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    & li {
      padding: 15px 10px;
      border-bottom: 1px solid #d3d3d3;
    }
    & .active {
      background-color: #eaeaea;
    }
  }

  & .create-topic {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #eaeaea;
  }
`;

function Index({ match, chat, selectChat }) {
  // console.log(match, chat);
  const { chats, currentWith } = chat;
  return (
    <Main>
      <ASide>
        <ul>
          {chats.map((chatItem) => {
            return (
              <li key={chatItem.id} className={currentWith === chatItem.id ? 'active' : ''} onClick={() => {
                selectChat(chatItem.id)
              }}>
                <div>{chatItem.name}</div>
              </li>
            )
          })}
        </ul>
        <div className="create-topic">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          <span>创建话题</span>
        </div>
      </ASide>
      <Messager />
    </Main>
  );
}

const mapStateToProps = state => ({
  chat: state.chat,
})

export default withRouter(connect(
  mapStateToProps,
  { selectChat }
)(Index))
// export default withRouter(Index)
// export default Home
