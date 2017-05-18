import axios from 'axios';

const SET_EARTH = 'SET_EARTH';
const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
const FETCH_ALL_COUNTRIES_SUCCESS = 'FETCH_ALL_COUNTRIES_SUCCESS';

const setEarthSuccess = (earth) => {
    return {
        type: SET_EARTH,
        earth: earth
    };
};

const getLocationSuccess = (location) => {
    return {
        type: GET_LOCATION_SUCCESS,
        location: location
    };
};

const fetchAllCountriesSuccess = (countries) => {
    return {
        type: FETCH_ALL_COUNTRIES_SUCCESS,
        countries: countries
    };
}

/* thunkify function*/
const getLocation = () => {
    return (dispatch) => {
        return navigator.geolocation.getCurrentPosition((location) => {
            let coordinates = [location.coords.latitude, location.coords.longitude]
            dispatch(getLocationSuccess(coordinates))
        })
    }
};

const fetchAllCountries = () => {
    return (dispatch)=> {
        return axios.get(`https://restcountries.eu/rest/v2/all`)
          .then(({ data }) => {
                dispatch(fetchAllCountriesSuccess(data));
          });
    };
};

const fetchCountry = (lat, lng) => {
    return (dispatch)=> {
        return axios.get(`http://ws.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=demo`)
          .then(({ data }) => {
                dispatch(fetchCountrySuccess(data));
          });
    };
};


let initialState = {};

const earthReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_EARTH:
            return state = Object.assign({}, state, { earth: action.earth });
        case GET_LOCATION_SUCCESS:
            return state = Object.assign({}, state, { location: action.location});
        case FETCH_ALL_COUNTRIES_SUCCESS:
            return state = Object.assign({}, state, { countries: action.countries });
    }
    return state
}

export { setEarthSuccess, getLocation, fetchCountry, fetchAllCountries }
export default earthReducer;

