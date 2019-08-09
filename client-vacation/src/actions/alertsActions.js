import {  SET_ALERT,REMOVE_ALERT } from "./types";
import uuid from 'uuid';


//Set Alert
export const setAlert = (msg,type,timeout= 3000) =>(dispatch)=>{
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg,  id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
