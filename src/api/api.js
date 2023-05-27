import axios from 'axios';
import { addUserInfo } from '../redux/modules/member';

axios.defaults.withCredentials = true;

export const apiUser = {
    userSignUp: (payload, navigate) => {
        console.log(payload);
        axios
            .post(`${process.env.REACT_APP_HOST}/api/signup`, payload)
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    userLogin: (payload, setCookies, navigate, dispatch) => {
        axios
            .post(`${process.env.REACT_APP_HOST}/api/login`, payload)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    setCookies('token', response.data.token);
                    dispatch(addUserInfo({ UserId: response.data.UserId }));
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    console.log(error);
                } else if (error.response.status === 412) {
                    alert(error.response.data.errorMessage);
                }
            });
    },
};
