import React, { useEffect, useState } from 'react';
import { Button, Comment, Header } from 'semantic-ui-react';
import { apiVideo } from '../api/api';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const CommentBox = () => {
    const [cookie] = useCookies();
    const param = useParams();
    //const queryClient = new QueryClient();
    const queryClient = useQueryClient();
    const [inputs, setInputs] = useState('');
    const {
        data,
        error,
        isLoading,
        refetch: getCommentRefetch,
    } = useQuery('getCommentList', () => apiVideo.getCommentList(param.id));

    const {
        dataComment,
        isLoadingComment,
        errorComment,
        mutate: addCommentData,
    } = useMutation(
        payload => {
            return apiVideo.addComment(payload);
        },
        {
            onSuccess: () => {
                // Invalidate and refresh
                // 이렇게 하면, todos라는 이름으로 만들었던 query를
                // invalidate 할 수 있어요.
                queryClient.invalidateQueries({ queryKey: ['getCommentList'] });
                //getCommentRefetch();
            },
        }
    );

    const addCommentAction = e => {
        e.preventDefault();

        const commentPayload = {
            id: param.id,
            commentInfo: {
                authorization: cookie.token,
                commentText: inputs,
            },
        };
        if (inputs == '') alert('댓글을 입력해주세요.');
        addCommentData(commentPayload, {
            onSuccess: () => {
                // Invalidate and refresh
                // 이렇게 하면, todos라는 이름으로 만들었던 query를
                // invalidate 할 수 있어요.
                queryClient.invalidateQueries({ queryKey: ['getCommentList'] });
                //getCommentRefetch();
                setInputs('');
            },
        });
    };

    const onKeyDown = e => {
        if (e.key === 'Enter') {
            addCommentAction(e); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    /* 아이디 비밀번호 setInput */
    const onChangeHandler = e => {
        const { value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs(value);
    };

    if (isLoading || isLoadingComment) return;
    if (error || errorComment) return;
    const { commentCount, comments } = data.data;

    return (
        <div className="w-full pt-10">
            <Comment.Group style={{ maxWidth: '100%', padding: '0 0 50px' }}>
                <Header as="h3" dividing>
                    댓글 {commentCount}개
                </Header>
                {cookie.token ? (
                    <form onSubmit={e => addCommentAction(e)}>
                        <div className="pb-10">
                            <textarea
                                className="w-full h-24 border-solid border border-Slate-600"
                                name="Comment"
                                value={inputs}
                                onChange={onChangeHandler}
                                onKeyDown={e => onKeyDown(e)}
                            />
                            <Button content="Add Reply" labelPosition="left" icon="edit" color="youtube" />
                        </div>
                    </form>
                ) : (
                    <div className="py-10 text-center text-base">
                        댓글을 작성하시려면{' '}
                        <Link to="/member/login" className="text-blue-500 underline">
                            로그인
                        </Link>{' '}
                        해주세요.
                    </div>
                )}

                {comments.length === 0 ? (
                    <EmptyComment>댓글이 아직 없습니다.</EmptyComment>
                ) : (
                    comments?.map((item, idx) => {
                        return (
                            <Comment key={idx}>
                                <Comment.Avatar src="/img/user/matt.jpg" />
                                <Comment.Content>
                                    <Comment.Author as="a">{item.UserId}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{item.Comment}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        );
                    })
                )}
            </Comment.Group>
        </div>
    );
};

const EmptyComment = styled.div`
    text-align: center;
    padding: 10px 0 50px;
`;

export default CommentBox;
