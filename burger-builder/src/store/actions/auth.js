import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    localStorage.removeItem('response');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheck = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expireTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0z1VUgXKFxa6614xaC3bwpqo5sKleMZI';
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0z1VUgXKFxa6614xaC3bwpqo5sKleMZI';
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expire', expirationTime);
                localStorage.setItem('response', response.data);
                dispatch(authSuccess(response.data));
                dispatch(authCheck(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logOut());
        } else {
            const expireTime = new Date(localStorage.getItem('expire'));
            const response = localStorage.getItem('response');
            if(expireTime < new Date()) {
                dispatch(logOut());
            } else {
                dispatch(authSuccess(response));
                dispatch(authCheck((expireTime.getTime() - new Date().getTime() / 1000)));
            }
        }
    }
}