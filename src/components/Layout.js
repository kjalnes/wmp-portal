import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../redux/reducers/userReducer';


const Layout = ({ children, products, user, logout })=> (
  <div className='container'>

    <div className='header'>
      <h1>WMP portal</h1>
      <Link to='/'>Home</Link>
      { ' | ' }
      <Link to='/portal'>Portal</Link>
      { ' | ' }
      {
        !user.id ? (
          <Link to='/login'>Login</Link>
        ):(
          <a onClick={ logout }>Logout ({ user.name })</a>
        )
      }
      <hr />
    </div>

    { children }
  </div>
);

const mapStateToProps = ({ products, user})=>(
  { user }
);

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(logout())
                    .then(()=> hashHistory.push('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
