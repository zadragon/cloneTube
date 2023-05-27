import React, { useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CommentBox from '../../components/Comment';
import { apiUser } from '../../api/api';
import { useMutation } from 'react-query';

const VideoDetail = () => {
    const signUpMutation = useMutation(apiUser.userLogin, {
        onMutate: variable => {
            console.log('onMutate', variable);
            // variable : {loginId: 'xxx', password; 'xxx'}
        },
        onError: error => {
            console.log(error);
            // console.log(variable);
            // console.log(context);
            // error
        },
        onSuccess: (data, variables, context) => {
            console.log('success', data, variables, context);
            console.log(data);
        },
        onSettled: () => {
            console.log('end');
        },
    });
    useEffect(() => {
        signUpMutation.mutate({
            UserId: 'hanghae',
            password: '4321aaaa',
        });
    }, []);

    return (
        <div className="flex flex-row flex-auto gap-10">
            <div className="w-4/5 ">
                <div className="videoArea w-full h-96 bg-slate-200 rounded-lg "></div>
                <div className="pt-5">
                    <strong className="text-3xl">제목</strong>
                </div>
                <div className="flex border-b border-Slate-600 pt-5 pb-5 gap-5">
                    <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                        <img src="/img/user/molly.png" />
                    </div>
                    <div>
                        <p>채널 이름</p>
                        <p>구독자 수 </p>
                    </div>
                    <div>
                        <Button color="youtube">
                            <Icon name="youtube" /> 구독
                        </Button>
                    </div>
                </div>
                <CommentBox />
            </div>
            <div>세로 재생영역</div>
        </div>
    );
};

export default VideoDetail;
