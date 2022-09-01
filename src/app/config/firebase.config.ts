const API_KEY = '';
const LOGIN_URL = '';
const SIGNUP_URL = ''

export function getSignInURL() {
    return LOGIN_URL+API_KEY;
}

export function getSignUpURL() {
    return SIGNUP_URL+API_KEY;
}