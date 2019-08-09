import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  msg: null,
  id: null
};

export default (state = initialState, action) => {
  console.log(action);
  console.log(action.payload);
  switch (action.type) {
    case SET_ALERT:
      return { ...state, ...action.payload };
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
