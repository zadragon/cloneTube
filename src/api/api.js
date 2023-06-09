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

    getUserProfile: payload => {
        return axios
            .post(`${process.env.REACT_APP_HOST}/api/profile`, payload.token)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },

    getMyVideo: payload => {
        return axios
            .post(`${process.env.REACT_APP_HOST}/api/myvideolist`, payload)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },

    addUserProfileImg: payload => {
        return axios
            .put(`${process.env.REACT_APP_HOST}/api/profile`, payload)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
};

export const apiVideo = {
    getAddView: id => {
        return axios.get(`${process.env.REACT_APP_HOST}/api/${id}/view`).then(response => {
            console.log(response);
        });
    },
    getVideoList: () => {
        return axios.get(`${process.env.REACT_APP_HOST}/api/videolist`);
    },
    getVideoDetail: id => {
        return axios.get(`${process.env.REACT_APP_HOST}/api/videoinfo/${id}`);
    },
    getCommentList: id => {
        return axios.get(`${process.env.REACT_APP_HOST}/api/${id}/comment`);
    },
    addComment: payload => {
        const { id, commentInfo } = payload;
        return axios.post(`${process.env.REACT_APP_HOST}/api/${id}/comment`, commentInfo).then(response => {
            console.log(response);
        });
    },
    removeComment: payload => {
        const { id, commentId, token } = payload;
        console.log(payload);
        return axios
            .delete(`${process.env.REACT_APP_HOST}/api/movie/${id}/comment/${commentId}`, {
                authorization: token,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    addSubscribe: payload => {
        console.log(payload);
        return axios
            .post(`${process.env.REACT_APP_HOST}/api/subscript`, payload)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data.errorMessage);
            });
    },
    addLike: payload => {
        const { MovieId } = payload;
        console.log(payload);
        return axios.post(`${process.env.REACT_APP_HOST}/api/${MovieId}/like`, MovieId).then(response => {
            console.log(response);
        });
    },
    videoUpload: payload => {
        axios
            .post(`${process.env.REACT_APP_HOST}/api/upload`, payload)
            .then(response => {
                console.log(response);
                alert(response.data.message);
            })
            .catch(error => {
                console.log(error);
            });
    },
    SearchResult: payload => {
        return axios.post(`${process.env.REACT_APP_HOST}/api/search`, payload).then(response => {
            console.log(response);
            return response;
        });
    },
};

export const apiSub = {
    getSubList: token => {
        return axios
            .post(`${process.env.REACT_APP_HOST}/api/sublist`, {
                authorization: token,
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            });
    },
};
