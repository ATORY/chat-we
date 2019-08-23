import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux'

import { sendMessage } from 'actions/chat'
import { ChatContext } from "store";

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  & .title {
    height: 40px;
    border-bottom: 1px solid darkgray;
  }
  & .record {
    flex-grow: 1;
    overflow: scroll;
  }
  & .input {
    border-top: 1px solid darkgray;
    height: 120px;
    display: flex;
    flex-direction: column;
    & .toolbar {
      height: 30px;
    }
    & .text-input {
      flex-grow: 1;
      & textarea {
        background: transparent;
        box-sizing: border-box;
        border: none;
        outline: none;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        padding: 10px;
        resize: none;
      }
    }
  }
`;

function Messager({ socket, currentChat, sendMessage }) {
  const textRef = React.createRef();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    textRef.current.focus();
  }, [currentChat, textRef]);

  function _sendMessage() {
    sendMessage(socket, currentChat.id, msg)
    setMsg("");
  }

  return (
    <Main
      onClick={e => {
        e.preventDefault();
        textRef.current.focus();
      }}
    >
      <div className="title">{currentChat.id}</div>
      <div className="record">
        {currentChat.chatMsg.map(item => {
            // console.log(item)
            return (
              <div
                key={`${Math.random().toString(36).substr(2)}-${item.time}`}
                style={{
                  textAlign: item.type === 0 ? 'right' : 'initial'
                }}
              >

                {item.msg}
              </div>
            );
          })}
      </div>
      <div className="input">
        <div className="toolbar">toolbar</div>
        <div className="text-input">
          <textarea
            ref={textRef}
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyPress={e => {
              if (e.which === 13) {
                e.preventDefault();
                _sendMessage();
              }
            }}
          />
        </div>
      </div>
    </Main>
  );
}

function Index({ chat, sendMessage }) {
  const { chats, currentWith } = chat;
  return (
    <ChatContext.Consumer>
      {({ socket }) => {
        // console.log(socket);
        const currentChat = chats.find(item => item.id === currentWith) || chats[0]
        return (
          <Messager
            socket={socket}
            currentChat={currentChat}
            sendMessage={sendMessage}
          />
        )
      }}
    </ChatContext.Consumer>
  );
}

const mapStateToProps = state => ({
  chat: state.chat,
})

export default connect(
  mapStateToProps,
  { sendMessage }
)(Index)
