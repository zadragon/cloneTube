import React from 'react';
import { Button, Comment, Header } from 'semantic-ui-react';

const CommentBox = () => {
    return (
        <div className="w-full pt-10">
            <Comment.Group style={{ maxWidth: '100%' }}>
                <Header as="h3" dividing>
                    Comments
                </Header>

                <form>
                    <div className="pb-10">
                        <textarea className="w-full h-24 border-solid border border-Slate-600" />
                        <Button content="Add Reply" labelPosition="left" icon="edit" color="youtube" />
                    </div>
                </form>
                <Comment>
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
                </Comment>
            </Comment.Group>
        </div>
    );
};

export default CommentBox;
