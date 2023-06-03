import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CommentBox from '../../components/Comment';
import VideoCard from '../../components/VideoCard';
import MetaTag from '../../components/MetaTag';
import { Link, useParams } from 'react-router-dom';
import { apiUser, apiVideo } from '../../api/api';
import { useMutation, useQuery } from 'react-query';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components';

const VideoDetail = () => {
    const param = useParams();
    const [cookie] = useCookies();
    const { data, error, isLoading } = useQuery('getVideoDetail', () => apiVideo.getVideoDetail(param.id));
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const addSubscribeAction = () => {
        const payload = {
            userId: stringId,
            authorization: cookie.token,
        };
        if (cookie.token) {
            apiVideo.addSubscribe(payload);
        } else {
            alert('구독은 로그인을 해주세요.');
        }
    };

    const getVideos = async page => {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/api/videolist/${page}`);
        console.log('data', res);
        setVideos(prev => [...prev, ...res.data.VideoList]);
        setLoading(true);
    };

    useEffect(() => {
        getVideos(page);
    }, [page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    const target = useRef(); //타겟 설정을 위한 useRef -> 타겟에 레퍼런스를 설정한다.

    useEffect(() => {
        if (loading) {
            //로딩되었을 때만 실행
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        loadMore();
                    }
                },
                { threshold: 1 }
            );
            //옵져버 탐색 시작
            observer.observe(target.current);
        }
    }, [loading]);

    console.log('videos', videos);

    if (isLoading) return;
    if (error) return;

    const { Like, Title, URL, View, UserId: numberId } = data.data.movie;
    const { SubscriptCount, UserId: stringId, UserImage } = data.data.User_Info;

    return (
        <>
            <MetaTag
                title="영상보기 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex flex-row flex-auto gap-10">
                <div className="w-4/5 ">
                    <div className="videoArea w-full h-96 bg-slate-200 rounded-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="100%"
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
                            <p className="font-bold text-xl">{numberId}</p>
                            <p>구독자 {SubscriptCount}명</p>
                        </div>
                        <div>
                            <Button color="youtube" onClick={addSubscribeAction}>
                                <Icon name="youtube" /> 구독
                            </Button>
                        </div>
                        <div className="flex items-center text-lg">
                            <button>👍 좋아요 {Like}</button>
                        </div>
                    </div>
                    <CommentBox />
                </div>

                <div className="relative">
                    <div className="flex-col">
                        {videos?.map((videoInfo, idx) => {
                            return <VideoCard key={idx} videoInfo={videoInfo} />;
                        })}
                    </div>
                    <InfyScrollTarget ref={target}></InfyScrollTarget>
                </div>
            </div>
        </>
    );
};

export default VideoDetail;

const InfyScrollTarget = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 250px;
    background-color: aliceblue;
    opacity: 0.9;
`;
