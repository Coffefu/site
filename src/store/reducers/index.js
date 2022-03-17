import { default as navigation } from './navigation'
import { default as menu } from './menu'
import { combineReducers } from 'redux';
import user from "./user";

export default combineReducers({
   navigation,
   menu,
   user
});