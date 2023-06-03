import React, { useEffect, useState } from 'react';
import { Button, Comment, Header } from 'semantic-ui-react';
import { apiVideo } from '../api/api';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const CommentBox = () => {
    const [cookie] = useCookies();
    const param = useParams();
    const queryClient = new QueryClient();
    const [inputs, setInputs] = useState('');
    const { data, error, isLoading } = useQuery('getCommentList', () => apiVideo.getCommentList(param.id));
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
                queryClient.invalidateQueries('getCommentList');
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
        addCommentData(commentPayload);
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

                <form onSubmit={e => addCommentAction(e)}>
                    <div className="pb-10">
                        <textarea
                            className="w-full h-24 border-solid border border-Slate-600"
                            name="Comment"
                            value={inputs}
                            onChange={onChangeHandler}
                        />
                        <Button content="Add Reply" labelPosition="left" icon="edit" color="youtube" />
                    </div>
                </form>
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
                {/* <Comment>
                    <Comment.Avatar src="/img/user/matt.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src="/img/user/elliot.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src="/img/user/joe.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    </Comment.Content>
                </Comment> */}
            </Comment.Group>
        </div>
    );
};

const EmptyComment = styled.div`
    text-align: center;
    padding: 10px 0 50px;
`;

export default CommentBox;
