import * as types from '../types'

export default class userStore {

    static changeCoffeeHouse = (coffeeHouse) => {
        return async dispatch => {
            dispatch(change(coffeeHouse))
            localStorage.setItem('coffeeHouse', JSON.stringify(coffeeHouse))
        }

        function change(coffeeHouse) { return { type: types.CHANGE_COFFEE_HOUSE, payload: coffeeHouse }}
    }

    static changeOrder = (order) => {
        return async dispatch => {
            dispatch(change(order))
            localStorage.setItem('order', JSON.stringify(order))
        }

        function change(order) { return { type: types.CHANGE_ORDER, payload: order }}
    }
}