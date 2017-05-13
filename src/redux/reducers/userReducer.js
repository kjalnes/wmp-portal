import axios from 'axios';

/*** CONSTANTS ***/
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';

/*** ACTIONS ***/
const createUserSuccess = (user) => {
  return {
    type: CREATE_USER_SUCCESS,
    user
  }
}
const createClassSuccess = (class) => {
  return {
    type: CREATE_CLASS_SUCCESS,
    class: class
  }
}




/*** METHODS ***/

/* step 1 */
const createUser = (user) => {
  return (dispatch)=> {
    return axios.post(`/api/user`, user)
      .then(response => {
        return dispatch(createUserSuccess(response.data))
      });
  };
}

/* step 2 */
const createClass = (class) => {
  return (dispatch)=> {
      return axios.post(`/api/class`, class)
        .then(response => {
          return dispatch(createClassSuccess(response.data))
        });
  };
}


const userReducer = (state={}, action)=> {
  switch(action.type){
    case CREATE_USER_SUCCESS:
      state = Object.assign({}, state, {user: action.user});
      break;
    case CREATE_CLASS_SUCCESS:
      state = Object.assign({}, state, {class: action.class});
      break;
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, action.user);
      break;
    case LOGOUT_SUCCESS:
      state = {};
      break;
  }
  return state;
};



export { createUser, createClass };











/***/
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginUserSuccess = (user)=> {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const logoutSuccess = ()=> ({
  type: LOGOUT_SUCCESS
});


const exchangeTokenForUser = ()=> {
  return (dispatch)=> {
    if(!localStorage.getItem('token'))
      return Promise.reject('no local storage token');
    return axios.get(`/api/auth/${localStorage.getItem('token')}`)
      .then(response => response.data)
      .then(user => {
        dispatch(loginUserSuccess(user))
        return user;
      })
  }
};


const attemptLogin = (dispatch)=> {
  return (dispatch)=> {
    return exchangeTokenForUser(localStorage.getItem('token'), dispatch);
  };
};

const logout = ()=> {
  return (dispatch)=> {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  }
}

const login = (credentials)=> {
  return (dispatch)=> {
    return axios.post('/api/auth', credentials)
      .then(response => response.data)
      .then(data => localStorage.setItem('token', data.token))
      .then( ()=> dispatch(exchangeTokenForUser()))
      .catch((er)=> {
        localStorage.removeItem('token');
        throw er;
      });
  };
};


export {
  login,
  exchangeTokenForUser,
  logout,
};



export default userReducer;
