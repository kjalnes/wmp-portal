import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import Layout from './components/Layout';
import Home from './components/Home';
// import ProductsPage from './components/Product/ProductsPage';
import LoginPage from './components/LoginPage';
import PortalContainer from './components/containers/PortalContainer';

import { exchangeTokenForUser } from './redux/reducers/userReducer';
import { loadProducts } from './redux/reducers/productsReducer';



const Routes = ({ bootstrap })=> {
  return (
    <Router history={ hashHistory } onEnter={ bootstrap() }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ Home } />

        <Route path='portal' component={PortalContainer} />
        <Route path='login' component={LoginPage} />
      </Route>
    </Router>
  );
};

const mapDispatchToProps = (dispatch)=> {
  const bootstrap = ()=> {
    dispatch(exchangeTokenForUser())
      .then( user => console.log(user));
  };
  return {
    bootstrap
  };
};

export default connect(null, mapDispatchToProps)(Routes);
