import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';

const Router = () => {
    return (
        // url 라우터 처리
        <BrowserRouter>
            <Routes>
                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* 상품 관련 */}
                    {/* <Route path="/" element={<GoodsList />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
