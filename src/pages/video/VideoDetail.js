import React, { useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CommentBox from '../../components/Comment';
import VideoCard from '../../components/VideoCard';
import MetaTag from '../../components/MetaTag';
import { Link } from 'react-router-dom';

const VideoDetail = () => {
    return (
        <>
            <MetaTag
                title="영상보기 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex flex-row flex-auto gap-10">
                <div className="w-4/5 ">
                    <div className="videoArea w-full h-96 bg-slate-200 rounded-lg ">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/gr7J3_eswxU"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="pt-5">
                        <strong className="text-3xl">제목</strong>
                    </div>
                    <div className="flex border-b border-Slate-600 pt-5 pb-5 gap-5">
                        <Link to="/user/mypage">
                            <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                                <img src="/img/user/molly.png" />
                            </div>
                        </Link>
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
                <div>
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                </div>
            </div>
        </>
    );
};

export default VideoDetail;
