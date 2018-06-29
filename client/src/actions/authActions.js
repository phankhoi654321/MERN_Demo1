import axios from "axios";
import { GET_ERRORS } from "./types";

//Actions must be plain objects. Use custom middleware for async actions.   //dispatch => thunk
export const registerUser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/register", userdata)
    .then(res => history.push("/login"))
    // err.response tra ve nhung error tu server, .data de lay error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
