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

const createClass = (schoolDetails) => {
  return (dispatch)=> {
      return axios.post(`/api/class`, schoolDetails)
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
    return (dispatch)=> {
        return axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
          .then(({ data }) => {
              dispatch(fetchCountrySuccess(data, classType));
          });
    };
};

const findMatchFn = (schoolDetails) => {
    return (dispatch)=> {
        return axios.get(`/api/class/${schoolDetails.semester}`)
        .then(response => {
            const classes = response.data;
            const lat = schoolDetails.coordinates[ 0 ];
            const lng = schoolDetails.coordinates[ 1 ];
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

            const matchLat = match.latlng[ 0 ];
            const matchLng = match.latlng[ 1 ];

            dispatch(fetchCountryCode(matchLat, matchLng, "matchClass"));
            return dispatch(matchFound(match));
        });
    };
}

/* helper fn that calculates distance between coordinates */
const distance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = Math.PI * lat1 / 180
    const radlat2 = Math.PI * lat2 / 180
    const radlon1 = Math.PI * lon1 / 180
    const radlon2 = Math.PI * lon2 / 180
    const theta = lon1 - lon2
    const radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist * 1.609344;
}

const classReducer = (state = {}, action)=> {
    switch(action.type){
        case CREATE_CLASS_SUCCESS:
            return state = Object.assign({}, state, { classDetails: action.classDetails });
        case MATCH_FOUND_SUCCESS:
            return state = Object.assign({}, state, { matchClass: action.matchClass });
        case FETCH_COUNTRY_SUCCESS:
            const updatedCountry = Object.assign({}, state[ action.classType ], action.country);
            return state = Object.assign({}, state, {[ action.classType ]: updatedCountry });
    }
    return state;
};

export { createClass, findMatchFn };
export default classReducer;
