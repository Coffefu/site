import * as types from '../types'
import {history} from "../../common/components/history";

export default class navigationStore {

    static changeActiveTab = (tab) => {
        return async dispatch => {
            dispatch(change(tab))
            localStorage.setItem('tab', tab)
            history.push(tab)
        }

        function change(tab) { return { type: types.CHANGE_CURRENT_TAB, payload: tab }}
    }
}