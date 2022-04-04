import * as types from '../types'

const initialState = {
    coffeeHouse: JSON.parse(localStorage.getItem('coffeeHouse')) || {
        id: '1',
        title: 'Полка кофе',
        address: 'Корпус D, 7 этаж \n Открыто до 20:00',
        short: 'D7'
    },
    order: JSON.parse(localStorage.getItem('order')) || {
        number: null,
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