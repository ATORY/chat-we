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
      background-color: #eaeaea
    }
  }
`;

function Index({ match, chat, selectChat }) {
  // console.log(match, chat);
  const { withChats, currentWith } = chat;
  return (
    <Main>
      <ASide>
        <ul>
          {withChats.map((chatWith) => {
            return (
              <li key={chatWith.id} className={currentWith.id === chatWith.id ? 'active' : ''} onClick={() => {
                selectChat(chatWith)
              }}>
                <div>{chatWith.name}</div>
              </li>
            )
          })}
        </ul>
      </ASide>
      <Messager chatWith={currentWith} />
      {/* <Route path={`${match.path}/:id`} component={Messager} /> */}
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
