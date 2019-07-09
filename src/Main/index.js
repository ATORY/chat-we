import React, { useState } from "react";
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
export default function Index({ socket }) {

  const [msg, setMsg] = useState('')

  function sendMessage() {

  }
  // function sendRoomMessage() {

  // }
  return (
    <ChatContext.Consumer>
      {({ dispatch, middle, main }) => {
        if (main.type === "bubble") {
          return (
            <Main>
              <div className="title">{main.room.id}</div>
              <div className="record"></div>
              <div className="input">
                <div className="toolbar"></div>
                <div className="text-input">
                  <textarea value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => {
                    if(e.which === 13){
                      e.preventDefault();
                      sendMessage()
                    }
                  }}/>
                </div>
              </div>
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
