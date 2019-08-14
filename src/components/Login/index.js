import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { loginASVisitor, justLook } from 'actions/base'

const StyledDiv = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
`;

// export default function() {
//   return (
//     <div>Login</div>
//   )
// }

function Index({ loginASVisitor }) {
  return (
    <StyledDiv>
      Login
      <div onClick={loginASVisitor}>游客</div>
      <Link to='/explore'>
        <div>只是看看</div>
      </Link>
    </StyledDiv>
  )
}


export default withRouter(connect(
  null,
  { loginASVisitor, justLook }
)(Index))
