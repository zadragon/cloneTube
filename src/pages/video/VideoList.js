import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';
import { apiVideo } from '../../api/api';
import styled from 'styled-components';
import MetaTag from '../../components/MetaTag';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            <MetaTag
                title="영상목록 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 relative">
                    <VideoWrap>
                        {videos?.map((videoInfo, idx) => {
                            return <VideoCard key={idx} videoInfo={videoInfo} />;
                        })}
                    </VideoWrap>
                    <InfyScrollTarget ref={target}></InfyScrollTarget>
                </div>
            </div>
        </>
    );
};

const VideoWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > a {
        width: 25%;
    }
`;

const InfyScrollTarget = styled.div`
    position: absolute;
    bottom: 0;
    left: -100px;
    width: 100px;
    height: 250px;
    background-color: white;
    opacity: 0.9;
`;

export default VideoList;
