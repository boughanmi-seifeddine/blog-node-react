import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../types"
const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: null,
                loading: false,
                error: false,
                lastAction:action.type
            }
        case REGISTER_FAIL:
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload,
                lastAction:action.type
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.data.user,
                isAuthenticated: true,
                loading: false,
                error: false,
                lastAction:action.type
            }
        case LOGIN_FAIL:
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload,
                lastAction:action.type
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                error: false,
                lastAction:LOGOUT
            }
        default:
            return state;
    }
};

export default authReducer;
