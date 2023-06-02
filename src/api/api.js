import axios from 'axios';

export const apiUser = {
    userSignUp: (payload, navigate, setInputs) => {
        axios
            .post(`${process.env.REACT_APP_HOST}/api/signup`, payload)
            .then(response => {
                if (response.status === 201) {
                    alert(response.data.message);
                    navigate('/member/login');
                }
                setInputs({
                    payload: {
                        UserId: '',
                        password: '',
                    },
                    pwValid: '',
                }); //인풋 초기화
            })
            .catch(error => {
                alert(error.response.data.errorMessage);
            });
    },
    userLogin: (payload, setCookies, navigate) => {
        axios
            .post(`${process.env.REACT_APP_HOST}/api/login`, payload)
            .then(response => {
                setCookies('token', response.data.authorization);
                navigate('/');
            })
            .catch(error => {
                alert(error.response.data.errorMessage);
            });
    },

    getUserProfile: token => {
        console.log(token);
        return (
            axios
                //.get(`${process.env.REACT_APP_HOST}/api/profile`)
                .get(`${process.env.REACT_APP_HOST}/api/sublist`, {
                    headers: {
                        Authorization: token,
                    },
                })

                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        );
    },
};

export const apiVideo = {
    getVideoList: () => {
        return axios.get(`${process.env.REACT_APP_HOST}/api/videolist`);
        // .then(response => {
        //     console.log(response);
        //     return response.data;
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    },
};
