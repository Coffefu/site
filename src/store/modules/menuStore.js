import * as types from '../types'
import callApi from "../../common/callApi";

export default class menuStore {

   static receiveMenu = () => {
      return async dispatch => {
         await callApi(`https://cofefu.ru/products`, 'GET', undefined, {})
            .then((json) => dispatch(success(json)))
            .catch((reason) => { console.log(reason); return dispatch(failure()); });
      }

      function success(data) { return { type: types.RECEIVE_MENU_SUCCESS, payload: data } }
      function failure() { return { type: types.RECEIVE_MENU_FAILURE } }
   }
}