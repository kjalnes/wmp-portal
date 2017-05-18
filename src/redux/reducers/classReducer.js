import axios from 'axios';

/*** CONSTANTS ***/
const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
const MATCH_FOUND_SUCCESS = 'MATCH_FOUND_SUCCESS';
const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS';

/*** ACTIONS ***/
const createClassSuccess = (classDetails) => ({
    type: CREATE_CLASS_SUCCESS,
    classDetails: classDetails
});

const matchFound = (matchClass) => ({
  type: MATCH_FOUND_SUCCESS,
  matchClass: matchClass
});

const fetchCountrySuccess = (country, classType) => {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        country,
        classType
    };
};

/*** METHODS ***/

const createClass = (schoolInfo) => {
  return (dispatch)=> {
      return axios.post(`/api/class`, schoolInfo)
        .then(({ data }) => {
            const { coordinates } = data;
            data.latlng = coordinates;
            const lat = coordinates[ 0 ];
            const lng = coordinates[ 1 ];
            dispatch(fetchCountryCode(lat, lng, "classDetails"));
            return dispatch(createClassSuccess(data));
        });

  };
}

const fetchCountryCode = (lat, lng, classType) => {
    return (dispatch)=> {
        return axios.get(`http://ws.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=kjalnes`)
          .then(({ data }) => {
              const { countryCode } = data;
              dispatch(fetchCountry(countryCode, classType));
          });
    };
};

const fetchCountry = (countryCode, classType) => {
  console.log("countryCode", countryCode)
    return (dispatch)=> {
        return axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
          .then(({ data }) => {
              dispatch(fetchCountrySuccess(data, classType));
          });
    };
};

const findMatchFn = (schoolInfo) => {
    return (dispatch)=> {
      // get all the schools that are looking to exchange in the period
      return axios.get(`/api/class/`)
        .then(response => {
          // get back all relevant schools and find the match that is furthest away
          const classes = response.data;
          const coordinates = schoolInfo.coordinates;
          const lat = coordinates[ 0 ];
          const lng = coordinates[ 1 ];
          let longest = 0;
          let match = classes.reduce( (match, currClass) => {
             const currDistance = distance(lat, lng, currClass.coordinates[0], currClass.coordinates[1]);

              if (currDistance > longest) {
                longest = currDistance;
                match = currClass;
              }

              match.latlng = match.coordinates;
             return match;
          });

          const matchLat = match.coordinates[ 0 ];
          const matchLng = match.coordinates[ 1 ];

          dispatch(fetchCountryCode(matchLat, matchLng, "matchClass"));
          return dispatch(matchFound(match));
        })
  };
}

/* helper function that calculates distance between two coordinates */

function distance(lat1, lon1, lat2, lon2) {
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
  return dist * 1.609344;
}



const classReducer = (state={}, action)=> {
  switch(action.type){
    case CREATE_CLASS_SUCCESS:
      return state = Object.assign({}, state, {classDetails: action.classDetails});
    case MATCH_FOUND_SUCCESS:
      return state = Object.assign({}, state, {matchClass: action.matchClass})
    case FETCH_COUNTRY_SUCCESS:
      const updatedCountry = Object.assign({}, state[ action.classType ], action.country);
      return state = Object.assign({}, state, {[ action.classType ]: updatedCountry });
  }
  return state;
};



export { createClass, findMatchFn };


export default classReducer;
