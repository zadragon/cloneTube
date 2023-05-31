import React, { useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { apiVideo } from '../../api/api';
import styled from 'styled-components';

const VideoList = () => {
    const [cookie] = useCookies();
    const {
        data,
        isLoading,
        error,
        mutate: getVideoData,
    } = useMutation(payload => {
        return apiVideo.getVideoList(payload);
    });

    useEffect(() => {
        console.log('cookie', cookie.token);
        console.log('isLoading', isLoading);
        console.log('error', error);

        getVideoData(cookie.token);
    }, []);

    console.log('data', data?.VideoList);

    //아래로 무한 스크롤관련 코드
    //뷰포트에 타겟이 보이면 api요청 혹은 관련동작을 작동한다.
    const target = useRef(null); //타겟 설정을 위한 useRef -> 타겟에 레퍼런스를 설정한다.

    useEffect(() => {
        observer.observe(target.current); //컴포넌트 렌더링시 타겟 요소 관측 시작
    }, []);

    // ✅ 관측되었을 경우 실행할 콜백함수입니다.
    const callback = () => {
        target.current.innerText += '관측되었습니다';
    };

    // ✅ observer를 선언합니다.
    // 첫 번째 인자로 관측되었을 경우 실행할 콜백함수를 넣습니다.
    // 두 번째 인자로 관측에 대한 옵션을 지정합니다.
    const observer = new IntersectionObserver(callback, {
        threshold: 0.1,
    });

    return (
        <div className="flex">
            <Sidebar />
            <div style={{ position: 'relative', height: '200vh' }}>
                <div className="flex">
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                </div>
                <InfyScrollTarget ref={target}></InfyScrollTarget>
            </div>
        </div>
    );
};

const InfyScrollTarget = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 250px;
    background-color: aliceblue;
    opacity: 0.9;
`;

export default VideoList;
