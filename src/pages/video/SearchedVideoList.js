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
import { useSelector, useDispatch } from 'react-redux';
import { SearchVideos } from '../../redux/modules/searchedSlice';

export default function SearchedVideoList() {
    const searchedVideoState = useSelector(state => state.searchedVideoState);

    console.log(searchedVideoState);

    // const {
    //     data: dataSearch,
    //     isLoading: isLoadingSearch,
    //     error: errorSearch,
    //     mutate: filteredvideos,
    // } = useMutation(payload => {
    //     return apiVideo.SearchResult(payload);
    // });

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const payload = { search: search };
    //     filteredvideos(payload, {
    //         onSuccess: () => {},
    //         onSuccess: () => {
    //             console.log('dataSearch', dataSearch);
    //         },
    //     });
    //     navigate(`/videos/${search}`);
    // };

    // useEffect(() => {
    //     console.log('dataSearch useEffect', dataSearch);
    //     dispatch(SearchVideos({ dataSearch }));
    // }, [dataSearch]);
    return <></>;
}
