import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import VideoList from '../pages/video/VideoList';
import VideoDetail from '../pages/video/VideoDetail';

const Router = () => {
    return (
        // url 라우터 처리
        <BrowserRouter>
            <Routes>
                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* 비디오 관련 */}
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/detail/:id" element={<VideoDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
