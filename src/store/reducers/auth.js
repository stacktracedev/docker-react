import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {loading: true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                loading: false,
                error: null,
                token: action.authData.idToken,
                userId: action.authData.localId
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.error
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                userId: null,
                token: null
            });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath: action.path
            });
        default:
            return state;
    }
}

export default reducer;