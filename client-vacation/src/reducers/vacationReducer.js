import {
  FEATCH_VACATIONS,
  NEW_VACATIONS,
  DELETE_VACATION,
  FEATCH_VACATION_BY_USER, FOLLOW_VACATION, UNFOLLOW_VACATION
} from "../actions/types";

const initialState = {
  vacations: [],
  vacationsFollowedByUser: []
};

export default function(state = initialState, action) {
  console.log(`Vacation reducer called  | action = ${action} | actionType =  ${action.type}`);
  switch (action.type) {
    case FEATCH_VACATIONS:
      return {
        ...state,
        vacations: action.payload
      };
    case FEATCH_VACATION_BY_USER:
      console.log(`Vacations followed: ${action.payload}`);
      return {
        ...state,
        vacationsFollowedByUser: action.payload
      };
    case NEW_VACATIONS:
      console.log(`action run`);
      return {
        ...state,
        vacations: [...state.vacations, action.payload]
      };
    case DELETE_VACATION:
      return {
        ...state,
        vacations: state.vacations.filter(
          vacation => vacation._id !== action.payload
        )
      };
    case FOLLOW_VACATION:
    case UNFOLLOW_VACATION:
      return {
        ...state
      };

    default:
      return state;
  }
}
