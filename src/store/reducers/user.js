import * as types from '../types'

const initialState = {
    coffeeHouse: JSON.parse(localStorage.getItem('coffeeHouse')) || {
        id: null,
        name: 'Кафе не выбрано',
        placement: ''
    },
    order: JSON.parse(localStorage.getItem('order')) || {
        number: -1,
        time: null,
    },
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_COFFEE_HOUSE:
            return {
                ...state,
                coffeeHouse: action.payload,
            };
        case types.CHANGE_ORDER:
            return {
                ...state,
                order: action.payload,
            }
        default:
            return state;
    }
}

export default user;