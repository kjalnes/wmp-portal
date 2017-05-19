import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from './components/Layout';
import PortalContainer from './components/containers/PortalContainer';

const Routes = ({ bootstrap })=> {
  return (
    <Router history={ hashHistory } >
      <Route path='/' component={ Layout }>
        <IndexRoute component={ PortalContainer } />
        <Route path='login' />
      </Route>
    </Router>
  );
};

export default Routes;

