import * as types from '../types'
import callApi from "../../common/callApi";

export default class menuStore {

   static receiveMenu = () => {
      return async dispatch => {
         await callApi(`https://cofefu.ru/dev/api/products`, 'GET', undefined, {})
            .then((json) => dispatch(success(json)))
            .catch((reason) => { console.log(reason); return dispatch(failure()); });
      }

      function success(data) { return { type: types.RECEIVE_MENU_SUCCESS, payload: data } }
      function failure() { return { type: types.RECEIVE_MENU_FAILURE } }
   }
   static receiveAddons = () => {
      return async dispatch => {
         await callApi(`https://cofefu.ru/dev/api/toppings`, 'GET', undefined, {})
            .then((json) => dispatch(success(json)))
            .catch((reason) => { console.log(reason); return dispatch(failure()); });
      }

      function success(data) { return { type: types.RECEIVE_ADDONS_SUCCESS, payload: data } }
      function failure() { return { type: types.RECEIVE_ADDONS_FAILURE } }
   }
   static receiveCoffeeHouses = () => {
      return async dispatch => {
         await callApi(`https://cofefu.ru/dev/api/coffee_houses`, 'GET', undefined, {})
            .then((json) => dispatch(success(json)))
            .catch((reason) => { console.log(reason); return dispatch(failure()); });
      }

      function success(data) { return { type: types.RECEIVE_COFFEEHOUSES_SUCCESS, payload: data } }
      function failure() { return { type: types.RECEIVE_COFFEEHOUSES_FAILURE } }
   }
}