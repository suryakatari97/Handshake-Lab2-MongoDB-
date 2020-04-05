//import {TEST_DISPATCH} from '../actions/types'
import { SET_CURRENT_USER } from "../actions/types";
import { isFieldEmpty } from "../components/auth/HelperApis";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        // case TEST_DISPATCH:
        //     return {
        //         ...state,
        //         user : action.payload
        //     }
        case SET_CURRENT_USER:
            console.log(action.payload);
            
            return {
                ...state,
                isAuthenticated: !isFieldEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;

    }
}