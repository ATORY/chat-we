import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ChatContext, SEND_MESSAGE } from "../ChatState";

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


function Messager({ id, socket, phone, chat}) {
  const textRef = React.createRef()
  const [msg, setMsg] = useState('')

  useEffect(() => {
    textRef.current.focus()
  }, [])

  function sendMessage() {
    // console.log(socket)
    socket.emit('chat', { from: phone, to: id, data: { msg } })
    setMsg('')
  }

  return (
    <>
      <div className="title">{id}</div>
      <div className="record">
        {chat.chat.map(item => {
          // console.log(item)
          return (
            <div key={Math.random().toString(36).substr(2)}>{item.msg.msg.data}</div>
          );
        })}
      </div>
      <div className="input">
        <div className="toolbar">toolbar</div>
        <div className="text-input">
          <textarea ref={textRef} value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => {
            if(e.which === 13){
              e.preventDefault();
              sendMessage()
            }
          }}/>
        </div>
      </div>
    </>
  )
}

export default function Index({ phone }) {
  return (
    <ChatContext.Consumer>
      {({ dispatch, middle, main, socket }) => {
        if (main.type === "bubble") {
          const chat = middle.chats.find(item => item.phone === middle.select) || { chat: [] }
          return (
            <Main>
              <Messager id={middle.select} socket={socket} phone={phone} chat={chat}/>
            </Main>
          );
        }

        if (main.type === "connector") {
          return (
            <Main>
              {main.connector.phone}
              <button
                onClick={() => {
                  dispatch({
                    type: SEND_MESSAGE,
                    data: { connector: main.connector.phone }
                  });
                }}
              >
                send message
              </button>
            </Main>
          );
        }
        return <Main>Err</Main>;
      }}
    </ChatContext.Consumer>
  );
}
