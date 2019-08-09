import axios from "axios";

const setAuthToken = token => {
    console.log(`Set token called`);
        if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};
export default setAuthToken;
