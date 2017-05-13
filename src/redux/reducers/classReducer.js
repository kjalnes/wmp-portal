import axios from 'axios';

/*** CONSTANTS ***/
const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';

/*** ACTIONS ***/

const createClassSuccess = (classDetails) => ({
    type: CREATE_CLASS_SUCCESS,
    classDetails: classDetails
});



/*** METHODS ***/

const createClass = (schoolInfo) => {
  return (dispatch)=> {
      return axios.post(`/api/class`, schoolInfo)
        .then(response => {
          console.log('response shpulf be school class', response.data)
          return dispatch(createClassSuccess(response.data))
        });
  };
}


const classReducer = (state={}, action)=> {
  switch(action.type){
    case CREATE_CLASS_SUCCESS:
      state = Object.assign({}, state, {classDetails: action.classDetails});
      break;
  }
  return state;
};



export { createClass };


export default classReducer;
