import React, { useState } from "react";
import styled from "styled-components";

import { ChatContext, SELECT_CONNECTOR } from "../ChatState";

const ASide = styled.div`
  width: 230px;
  background: white;
  /* border: 1px solid #d3d3d3; */
  border-top: none;
  border-bottom: none;
  overflow-y: scroll;
`;

const StyledRoom = styled.div`
  display: flex;
  padding: 5px;
  height: 61px;
  box-sizing: border-box;
  user-select: none;
  border-bottom: 1px solid lightgray;
  & .people {
    width: 48px;
    height: 48px;
    margin-right: 10px;
    border: 1px solid lightgray;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledConnector = styled.div`
  background-color: ${props => (props.select ? 'gray' : 'white')};
  user-select: none;
  display: flex;
  align-items: center;
  padding: 5px 0 5px 10px;
  border-bottom: 1px solid lightgray;
`;

function Room({ id, name, people }) {
  const roomName = name || people[0].phone;
  return (
    <StyledRoom>
      <div className="people">
        {people.map(({ phone }) => (
          <span key={phone}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
              <path fill="none" d="M0 0h24v24H0z" />
            </svg>
          </span>
        ))}
      </div>
      <span>{roomName}</span>
    </StyledRoom>
  );
}

function Connector({ phone, selectRow, select, dispatch }) {
  return (
    <StyledConnector select={phone === selectRow} onClick={() => {
      select(phone)
      dispatch({ type: SELECT_CONNECTOR, data: { phone } })
    }}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </span>
      <span>{phone}</span>
    </StyledConnector>
  );
}

export default function Index() {
  const [selectRow, setSelectRow] = useState('');
  function select(row) {
    setSelectRow(row)
  }
  return (
    <ChatContext.Consumer>
      {({ dispatch, middle, nav }) => {
        const { rooms, connectors } = middle;
        const { bubble, connector } = nav;
        if (bubble.active) {
          return (
            <ASide>
              {rooms.map(room => (
                <Room key={room.id} {...room} selectRow={selectRow} select={select} dispatch={dispatch} />
              ))}
            </ASide>
          );
        }
        if (connector.active) {
          return (
            <ASide>
              {connectors.map(connector => (
                <Connector key={connector.phone} {...connector} selectRow={selectRow} select={select} dispatch={dispatch} />
              ))}
            </ASide>
          );
        }
        return <ASide>Err</ASide>;
      }}
    </ChatContext.Consumer>
  );
}
