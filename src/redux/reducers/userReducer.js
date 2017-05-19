import axios from 'axios';

/*** CONSTANTS ***/

const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

/*** ACTIONS ***/

const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    user: user
});

/*** METHODS ***/

const createUser = (user) => {
  return (dispatch)=> {
    return axios.post(`/api/user`, user)
      .then(response => {
        return dispatch(createUserSuccess(response.data))
      });
  };
};

const userReducer = (state={}, action)=> {
  switch(action.type){
    case CREATE_USER_SUCCESS:
      return state = Object.assign({}, state, { user: action.user });
  }
  return state;
};

export { createUser };
export default userReducer;
