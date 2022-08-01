import loginApi from '../../Services/api/loginApi';
import { setAuth } from '../../Services/api/axios';
const LOGIN_LOADING = "LOGIN_LOADING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGIN_JWT_SET = "LOGIN_JWT_SET";
const LOGIN_CLEAN_ERROR = "LOGIN_CLEAN_ERROR";
const LOGIN_SIGNOUT = "LOGIN_SIGNOUT";

export const submitLogin = async (dispatch, email, password) => {
  try {
    dispatch({ type: LOGIN_LOADING, payload: null });
    const { data } = await loginApi(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    console.log(data);
    setAuth(data.token);
    dispatch({ type: LOGIN_JWT_SET, payload: null });
  } catch (ex) {
    console.log(ex);
    dispatch({ type: LOGIN_FAILED, payload: 'Credenciales no son Válidas!' });
    throw Error("Credenciales no Válidas");
  }
}

export const cleanLoginError = (dispatch) => {
  dispatch({ type: LOGIN_CLEAN_ERROR, payload: null });
}

export const cerrarSesion = (dispatch) => {
  dispatch({ type: LOGIN_SIGNOUT, payload: null });
}