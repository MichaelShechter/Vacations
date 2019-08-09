import { combineReducers } from "redux";
import vacationReducer from "./vacationReducer";
import authReducer  from './authReducer';
import alertReducer from './alertReducer'
export default combineReducers({
  vacationsItems: vacationReducer,
  auth: authReducer,
  alert:alertReducer
});
