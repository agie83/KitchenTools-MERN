import AuthService from '../../services/AuthService';

export const loginUser = async (dispatch, loginPayload) => {
  dispatch({ type: 'REQUEST_LOGIN' });
  try {
    const authPayload = await AuthService.login(loginPayload);
    dispatch({ type: 'LOGIN_SUCCESS', payload: authPayload });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: { errorMessage: err } });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  AuthService.logout();
};
