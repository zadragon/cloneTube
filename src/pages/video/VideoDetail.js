import React, { useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CommentBox from '../../components/Comment';
import VideoCard from '../../components/VideoCard';
import MetaTag from '../../components/MetaTag';
import { Link, useParams } from 'react-router-dom';
import { apiVideo } from '../../api/api';
import { useQuery } from 'react-query';

const VideoDetail = () => {
    // const [cookie] = useCookies();
    // const {
    //     data,
    //     isLoading,
    //     error,
    //     mutate: getVideoData,
    // } = useMutation(payload => {
    //     return apiVideo.getVideoList(payload);
    // });

    // useEffect(() => {
    //     console.log('cookie', cookie.token);
    //     console.log('isLoading', isLoading);
    //     //console.log('error', error);

    //     getVideoData(cookie.token);
    // }, []);

    // console.log('data', data?.VideoList);

    const param = useParams();
    const { data, error, isLoading } = useQuery('getVideoDetail', () => apiVideo.getVideoDetail(param.id));

    if (isLoading) return;
    if (error) return;
    const { Like, Title, URL, View } = data.data.movie;
    const { SubscriptCount, UserId, UserImage } = data.data.User_Info;

    return (
        <>
            <MetaTag
                title="영상보기 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex flex-row flex-auto gap-10">
                <div className="w-4/5 ">
                    <div className="videoArea w-full h-2/5 bg-slate-200 rounded-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="500px"
                            src={`https://www.youtube.com/embed/${URL}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            //allowfullscreen
                        ></iframe>
                    </div>
                    <div className="pt-5">
                        <strong className="text-3xl">{Title}</strong>
                        <p>조회수 {View}</p>
                    </div>
                    <div className="flex border-b border-Slate-600 pt-5 pb-5 gap-5">
                        <Link to="/user/mypage">
                            <div className="rounded-full w-10 h-10 bg-slate-200 overflow-hidden">
                                <img src={UserImage == null ? `/img/user/molly.png` : UserImage} />
                            </div>
                        </Link>
                        <div>
                            <p className="font-bold text-xl">{UserId}</p>
                            <p>구독자 {SubscriptCount}명</p>
                        </div>
                        <div>
                            <Button color="youtube">
                                <Icon name="youtube" /> 구독
                            </Button>
                        </div>
                        <div className="flex items-center text-lg">
                            <button>👍 좋아요 {Like}</button>
                        </div>
                    </div>
                    <CommentBox />
                </div>
                <div>
                    {/* <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard /> */}
                </div>
            </div>
        </>
    );
};

export default VideoDetail;
