import React from 'react'
import { connect } from 'react-redux'
import styled from "styled-components"
import { Link, } from "react-router-dom";

const ASide = styled.div`
  width: 230px;
  background: white;
  /* border: 1px solid #d3d3d3; */
  border-top: none;
  border-bottom: none;
  overflow-y: scroll;
`;


function Index({ connector, path }) {
  return (
    <ASide>
      <ul>
        {connector.map(() => {
          return (
            <li>
              <Link to={`${path}/rendering`}>Rendering with React</Link>
            </li>
          )
        })}
        
        <li>
          <Link to={`${path}/components`}>Components</Link>
        </li>
      </ul>
    </ASide>
  )
}

const mapStateToProps = state => ({
  connector: state.base.connector,
})

export default connect(mapStateToProps)(Index)
