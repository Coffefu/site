import * as types from '../types'

const initialState = {
   menu: [],
   tab: 'menu'
}

const menu = (state = initialState, action) => {
   switch (action.type) {
      case types.RECEIVE_MENU_SUCCESS:
         return {
            ...state,
            menu: action.payload,
         }
      default:
         return state;
   }
}

export default menu;