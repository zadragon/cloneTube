import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
import { useCookies } from 'react-cookie';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { apiVideo } from '../../api/api';
import styled from 'styled-components';
import MetaTag from '../../components/MetaTag';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchVideos } from '../../redux/modules/searchedSlice';

export default function SearchedVideoList() {
    const searchedVideoState = useSelector(state => state.searchedVideoState);

    console.log(searchedVideoState);

    const {
        data: dataSearch,
        isLoading: isLoadingSearch,
        error: errorSearch,
        mutate: filteredvideos,
    } = useMutation(payload => {
        return apiVideo.SearchResult(payload);
    });

    useEffect(() => {
        filteredvideos({ search: searchedVideoState });
    }, [searchedVideoState]);

    const target = useRef();
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
                        {dataSearch?.data?.VideoList.map((videoInfo, idx) => {
                            return <VideoCard key={idx} videoInfo={videoInfo} />;
                        })}
                    </VideoWrap>
                    <InfyScrollTarget ref={target}></InfyScrollTarget>
                </div>
            </div>
        </>
    );
}

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
