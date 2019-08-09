import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import axios from "axios";
import setAuthToken from ".././utils/setAuthToken";

//Load user
export const loadUser = (token) => async dispatch => {
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get(`/api/users`);

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
//Register  user
export const register = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };
  try {
    const res = await axios.post(
      `/api/users/register`,
      formData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    });
  }
};

//Login user
export const login = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };
  try {
    const res = await axios.post(
      "/api/users/login",
      formData,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (res) {

    dispatch({
      type: LOGIN_FAIL,

    });
  }
};

//Logout
export const logOut =()=> (dispatch) =>
  dispatch({
    type: LOGOUT
  });

//Clear Errors
export const clearErrors = () => dispatch => ({ type: CLEAR_ERRORS });
