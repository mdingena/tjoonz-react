import store from '../store';
import { checkLocalStorageAvailability } from '../utils';
import { BASE_URL, ENDPOINTS } from '../constants/api';
import setAuth from '../actions/setAuth';
import unsetAuth from '../actions/unsetAuth';

const isLocalStorageAvailable = checkLocalStorageAvailability();

export const authenticate = async (username, password) => {
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    json: true
  };

  const response = await window.fetch(`${BASE_URL}${ENDPOINTS.JWT}`, options);
  const auth = await response.json();

  if (!response.ok) {
    forgetAuth();

    return {
      token: null,
      message: auth.message
    };
  }

  rememberAuth(auth);

  return auth;
};

export const recallAuth = () => (isLocalStorageAvailable ? JSON.parse(window.localStorage.getItem('auth')) : null);

export const validateToken = async token => {
  if (!token) return false;

  const options = {
    method: 'post',
    headers: { Authorization: `Bearer ${token}` },
    json: true
  };

  const response = await window.fetch(`${BASE_URL}${ENDPOINTS.JWT_VALIDATION}`, options);

  if (!response.ok) {
    forgetAuth();
    return false;
  }

  const auth = await response.json();

  return auth.code === 'jwt_auth_valid_token';
};

export const rememberAuth = auth => {
  if (isLocalStorageAvailable) {
    try {
      window.localStorage.setItem('auth', JSON.stringify(auth));
    } catch {}
  }

  const action = setAuth(auth);
  store.dispatch(action);
};

export const forgetAuth = () => {
  if (isLocalStorageAvailable) {
    window.localStorage.removeItem('auth');
  }

  const action = unsetAuth();
  store.dispatch(action);
};
