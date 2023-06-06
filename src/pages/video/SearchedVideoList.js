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

export default function SearchedVideoList() {
    const { searchword } = useParams();
    // const { isLoading, error, data } = useQuery(['searchvideos', searchword], () => apiVideo.SearchResult(searchword), {
    //     staleTime: 6 * 10 * 1000,
    // });

    // const {
    //     data,
    //     isLoading,
    //     error,
    //     mutate: filteredvideos,
    // } = useMutation(payload => {
    //     return apiVideo.SearchResult(payload);
    // });

    // console.log('searchdata', data);

    return <></>;
}
