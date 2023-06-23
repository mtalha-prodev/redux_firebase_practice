import userReducer from './userReducer';

const {combineReducers} = require('redux');
const {countReducer} = require('./conterReducer');

export default rootReducer = combineReducers({
  counter: countReducer,
  user: userReducer,
});
