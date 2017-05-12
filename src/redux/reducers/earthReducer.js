import axios from 'axios';

const SET_EARTH = 'SET_EARTH';

const setEarthSuccess = (earth) => {
    // console.log('earth', earth)
    return ({
            type: SET_EARTH,
            earth: earth
        })
};

let initialState = {};

const earthReducer = (state=initialState, action) => {
    // console.log('action', action)
    switch(action.type) {
        case SET_EARTH:
            state = Object.assign({}, state, { earth: action.earth });
    }
    return state
}

export { setEarthSuccess }
export default earthReducer;

