import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import VideoList from '../pages/video/VideoList';
import VideoDetail from '../pages/video/VideoDetail';
import Login from '../pages/member/Login';
import SignUp from '../pages/member/SignUp';
import Mypage from '../pages/user/Mypage';

const Router = () => {
    return (
        // url 라우터 처리
        <BrowserRouter>
            <Routes>
                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* 회원 관련 */}
                    <Route path="/member/login" element={<Login />} />
                    <Route path="/member/signup" element={<SignUp />} />
                    {/* 비디오 관련 */}
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/detail/:id" element={<VideoDetail />} />

                    {/* 개인페이지 */}
                    <Route path="/user/mypage" element={<Mypage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
