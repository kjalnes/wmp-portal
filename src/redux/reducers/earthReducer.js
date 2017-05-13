import axios from 'axios';

const SET_EARTH = 'SET_EARTH';
const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';

const setEarthSuccess = (earth) => {
    // console.log('earth', earth)
    return ({
            type: SET_EARTH,
            earth: earth
        })
};

const getLocationSuccess = (location) => {
    console.log('location', location)
    return ({
            type: GET_LOCATION_SUCCESS,
            location: location
        })
};


/* thunkify */
const getLocation = () => {
    return (dispatch) => {
        return navigator.geolocation.getCurrentPosition((location) => {
            let coordinates = [location.coords.latitude, location.coords.longitude]
            dispatch(getLocationSuccess(coordinates))
        })
    }
}


let initialState = {};

const earthReducer = (state=initialState, action) => {
    console.log('action', action)
    switch(action.type) {
        case SET_EARTH:
            state = Object.assign({}, state, { earth: action.earth });
        case GET_LOCATION_SUCCESS:
            state = Object.assign({}, state, { location: action.location})
    }
    return state
}

export { setEarthSuccess, getLocation }
export default earthReducer;

