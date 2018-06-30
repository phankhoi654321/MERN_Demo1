import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request, if have token
    axios.defaults.headers.common["Authorization"] = token; //same with postman must be have Authorization with value is token
  } else {
    // Delete auth header, if token is false mean want to delete
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
