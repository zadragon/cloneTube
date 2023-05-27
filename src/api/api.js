import axios from 'axios';
axios.defaults.withCredentials = true;

export const apiUser = {
    userSignUp: payload => {
        console.log(payload);
        axios
            .post(`${process.env.REACT_APP_HOST}/api/signup`, payload)
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    userLogin: payload => {
        axios
            .post(`${process.env.REACT_APP_HOST}/api/login`, payload)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
};
