import React from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Person from "./Person";

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

const ASide = styled.div`
  width: 230px;
  background: white;
  /* border: 1px solid #d3d3d3; */
  border-top: none;
  border-bottom: none;
  overflow-y: scroll;
`;


export default function Index({ match }) {
  // console.log(match);
  return (
    <Main>
      <ASide>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>
      </ASide>
      <Route path={`${match.path}/:id`} component={Person} />
    </Main>
  );
}

// Index.propTypes = {
//     pathname: PropTypes.string,
//     search: PropTypes.string,
//     hash: PropTypes.string,
//   }

//   const mapStateToProps = state => ({
//     pathname: state.router.location.pathname,
//     search: state.router.location.search,
//     hash: state.router.location.hash,
//   })

// export default connect(mapStateToProps)(Index)
// export default withRouter(Index)
// export default Home
