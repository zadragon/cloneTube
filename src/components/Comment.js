import React, { useEffect, useState } from 'react';
import { Button, Comment, Header } from 'semantic-ui-react';
import { apiVideo } from '../api/api';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const CommentBox = () => {
    const [cookie] = useCookies();
    const param = useParams();

    const {
        dataComment,
        isLoadingComment,
        errorComment,
        mutate: addCommentData,
    } = useMutation(payload => {
        console.log('mutation', payload);
        return apiVideo.addComment(payload);
    });

    const [commentData, setCommentData] = useState([]);
    const { data, error, isLoading, refetch } = useQuery(['getCommentList', commentData], () =>
        apiVideo.getCommentList(param.id)
    );

    // useEffect(() => {
    //     console.log('cookie', cookie.token);
    //     console.log('isLoading', isLoading);
    //     //console.log('error', error);

    //     addComment(cookie.token);
    // }, []);
    console.log(refetch);

    const addCommentAction = e => {
        e.preventDefault();

        const commentPayload = {
            id: param.id,
            commentInfo: {
                authorization: cookie.token,
                commentText: '댓글확인중ㅎㅎ222333',
            },
        };
        console.log('click', commentPayload);
        addCommentData(commentPayload);
        setCommentData(commentPayload);
    };

    if (isLoading) return;
    if (error) return;
    const { commentCount, comments } = data.data;

    console.log(comments);

    return (
        <div className="w-full pt-10">
            <Comment.Group style={{ maxWidth: '100%', padding: '0 0 50px' }}>
                <Header as="h3" dividing>
                    댓글 {commentCount}개
                </Header>

                <form onSubmit={e => addCommentAction(e)}>
                    <div className="pb-10">
                        <textarea className="w-full h-24 border-solid border border-Slate-600" />
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
