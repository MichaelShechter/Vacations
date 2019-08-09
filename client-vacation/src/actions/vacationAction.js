import { FEATCH_VACATIONS, NEW_VACATIONS, DELETE_VACATION,FOLLOW_VACATION,UNFOLLOW_VACATION,FEATCH_VACATION_BY_USER,EDIT_VACATION } from "./types";
import axios from "axios";

//TODO: SET Alert message
export const fetchVacations = () => dispatch => {
  console.log(`Fetch action called`);
  axios
    .get("/api/vacations/")
    .then(res => dispatch({ type: FEATCH_VACATIONS, payload: res.data.data }))
    .catch(err => console.log(err));
};

//TODO: SET Alert message
export const   fetchVacationsFollowed = () =>dispatch =>{
  axios.get(`api/users/follow`)
      .then(res=>dispatch({type:FEATCH_VACATION_BY_USER,payload:res.data.data.followOn}))
  .catch(err =>console.log(err));
};

//TODO: SET Alert message
export const addVacation = (vacationData,history) => dispatch => {
  console.log(`Add vacation  action called -> ${vacationData} `);
  axios
    .post(`api/vacations/`, {
      ...vacationData
    })
    .then(res =>
      dispatch({
        type: NEW_VACATIONS,
        payload: res.data.vacation
      })
    )
      .then(()=>history.push('/'))
    .catch(err => console.log(err));
};

//TODO: Set Alert message
export const editVacation  = (formData) => dispatch =>{
    console.log("edit vacation action called");
    console.log(formData);
    axios
        .put(`api/vacations/${formData.id}`, {
            formData
        })
        .then(res =>dispatch ({
           type:EDIT_VACATION
        }))
        .then(error => {
            console.log(error);
        })



};






export const deleteVacation = _id => dispatch => {
  console.log(`Delete vacation  action called `);
  axios
    .delete(`/api/vacations/${_id}`)

    .then(res => console.log(res.data))
    .then(res =>
      dispatch({
        type: DELETE_VACATION,
        payload: _id
      })
    )

    .catch(err => console.log(err));
};


//TODO: SET Alert message
export const  followVacation  = id => dispatch =>{
  console.log('follow vacation action called ');
  axios
      .put(`api/users/follow/${id}`)
      .then(res=>{
          dispatch({
              type:FOLLOW_VACATION,
          })
      })
      .then(()=>dispatch(fetchVacationsFollowed()))

};


export const  unFollowVacation  = id => dispatch =>{
    console.log('unfollowed vacation action called ');
    axios
        .delete(`/api/users/follow/${id}`)
        .then(res=>{
            dispatch({
                type:UNFOLLOW_VACATION,
            })
        })
        .then(()=>dispatch(fetchVacationsFollowed()))

};
