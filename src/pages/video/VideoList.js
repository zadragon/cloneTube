import React, { useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';
import { apiVideo } from '../../api/api';
import styled from 'styled-components';
import MetaTag from '../../components/MetaTag';

const VideoList = () => {
    const { data, error, isLoading } = useQuery('todos', () => apiVideo.getVideoList());

    console.log(isLoading);
    console.log(error);
    console.log(data?.data.VideoList);
    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;
    //아래로 무한 스크롤관련 코드
    //뷰포트에 타겟이 보이면 api요청 혹은 관련동작을 작동한다.
    // const target = useRef(null); //타겟 설정을 위한 useRef -> 타겟에 레퍼런스를 설정한다.

    // useEffect(() => {
    //     observer.observe(target.current); //컴포넌트 렌더링시 타겟 요소 관측 시작
    // }, []);

    // // ✅ 관측되었을 경우 실행할 콜백함수입니다.
    // const callback = () => {
    //     target.current.innerText += '관측되었습니다';
    // };

    // // ✅ observer를 선언합니다.
    // // 첫 번째 인자로 관측되었을 경우 실행할 콜백함수를 넣습니다.
    // // 두 번째 인자로 관측에 대한 옵션을 지정합니다.
    // const observer = new IntersectionObserver(callback, {
    //     threshold: 0.1,
    // });

    return (
        <>
            <MetaTag
                title="영상목록 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex">
                <Sidebar />
                <div className="w-5/6">
                    <VideoWrap>
                        {data?.data.VideoList.map((videoInfo, idx) => {
                            return <VideoCard key={idx} videoInfo={videoInfo} />;
                        })}
                    </VideoWrap>
                    {/* <InfyScrollTarget ref={target}></InfyScrollTarget> */}
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
    right: 0;
    width: 100px;
    height: 250px;
    background-color: aliceblue;
    opacity: 0.9;
`;

export default VideoList;

//
