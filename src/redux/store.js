import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer';
import earthReducer from './reducers/earthReducer';
import classReducer from './reducers/classReducer';


const combined = combineReducers({
  user: userReducer,
  earth: earthReducer,
  schoolClass: classReducer
});

/* download the redux devtools chrome extension for this to work - https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
*/
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

if (reduxDevtools) {
    store = createStore(combined, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(combined, applyMiddleware(thunk));
}

// const store = createStore(combined, applyMiddleware(thunk));

export default store;


