import React from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Person from "./Person";
import Connector from './Connector';

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Index({ match }) {
  // console.log(match);
  return (
    <Main>
      <Connector path={match.path} />
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
