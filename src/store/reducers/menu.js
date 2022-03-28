import * as types from '../types'

const initialState = {
   menu: [],
   addons: [],
}

const menu = (state = initialState, action) => {
   switch (action.type) {
      case types.RECEIVE_MENU_SUCCESS:
         return {
            ...state,
            menu: action.payload,
         }
      case types.RECEIVE_ADDONS_SUCCESS:
         return {
            ...state,
            addons: action.payload,
         }
      default:
         return state;
   }
}

export default menu;