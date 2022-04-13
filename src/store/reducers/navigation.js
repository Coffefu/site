import * as types from '../types'

const initialState = {
    tab: localStorage.getItem('tab') || 'start',
}

const navigation = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_CURRENT_TAB:
            return {
                ...state,
                tab: action.payload
            }
        default:
            return state;
    }
}

export default navigation;