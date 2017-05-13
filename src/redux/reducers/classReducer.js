import axios from 'axios';

/*** CONSTANTS ***/
const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
const MATCH_FOUND_SUCCESS = 'MATCH_FOUND_SUCCESS';

/*** ACTIONS ***/
const createClassSuccess = (classDetails) => ({
    type: CREATE_CLASS_SUCCESS,
    classDetails: classDetails
});

const matchFound = (matchClass) => ({
  type: MATCH_FOUND_SUCCESS,
  matchClass: matchClass
})

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



const findMatchFn = (schoolInfo) => {
    console.log('schoolInfo', schoolInfo)
    return (dispatch)=> {
      // get all the schools that are looking to exchange in the period
      return axios.get(`/api/class`)
        .then(response => {
          // get back all relevant schools
          // find the match that is furthest away
          const classes = response.data;
          const coordinates = schoolInfo.coordinates;
          let longest = 0;
          let match = classes.reduce( (match, currClass)=> {
             const currDistance = distance(coordinates[0], coordinates[1], currClass.coordinates[0], currClass.coordinates[1], 'K');
             if(currDistance > longest) {
                longest = currDistance;
                match = currClass;
             }
             return match
          });

          return dispatch(matchFound(match))
        })
        // .then( response => {
        //   console.log('getting response? ', response)
        //   const matchClass = response.matchClass;

        // });
  };
}

/* helper function that calculates distance between two coordinates */

function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
}



const classReducer = (state={}, action)=> {
  switch(action.type){
    case CREATE_CLASS_SUCCESS:
      state = Object.assign({}, state, {classDetails: action.classDetails});
      break;
    case MATCH_FOUND_SUCCESS:
      state = Object.assign({}, state, {matchClass: action.matchClass})
      break;
  }
  return state;
};



export { createClass, findMatchFn };


export default classReducer;
