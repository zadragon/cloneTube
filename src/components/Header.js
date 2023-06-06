import React, { useState, useEffect } from 'react';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { apiVideo } from '../api/api';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { SearchVideos } from '../redux/modules/searchedSlice';

const Header = () => {
    const profileImgData = useSelector(state => state.profileImgState);
    const [search, setSearch] = useState('');
    const [layerOpen, setLayerOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const { searchword } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        const result = confirm('정말 로그아웃 하시겠습니까? 🤔');
        if (result) {
            removeCookie('token');
            setLayerOpen(false);
            alert('로그아웃 되었습니다. 🤗');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(SearchVideos(search));
        navigate(`/videos/${search}`);
        setSearch('');
    };

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

    // console.log('dataSearchhhh', dataSearch);

    // useEffect(() => setSearch(searchword || ''), [searchword]);

    return (
        <header className="w-full flex mt-2 justify-between items-center">
            <Link to="/" className="flex items-center">
                <AiFillYoutube className="text-4xl mr-2 text-logo" />
                <h1 className="font-semibold text-3xl">LoneTube</h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full flex justify-center h-11">
                <input
                    className="w-7/12 p-3.5 rounded-full border border-gray-300"
                    type="text"
                    placeholder="검색"
                    value={search}
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                />
                <button>
                    <AiOutlineSearch className="flex text-3xl ml-2 text-gray-500" />
                </button>
            </form>
            <div className="relative">
                {cookie.token ? (
                    <>
                        <Link to="/user/mypage" onMouseEnter={() => setLayerOpen(true)}>
                            {/* <img src={profileImgData.profileImg} alt="" /> */}
                            <Avatar
                                sx={{ m: 1, bgcolor: 'lightgray', width: 32, height: 32 }}
                                src={profileImgData.profileImg || '/broken-image.jpg'}
                                className="flex-end ml-4 "
                            />
                        </Link>
                        <LayerArea
                            className={layerOpen && 'active'}
                            onMouseLeave={() => setLayerOpen(false)}
                            onClick={logout}
                        >
                            <button className="text-xs">로그아웃</button>
                        </LayerArea>
                    </>
                ) : (
                    <Link to="/member/login">
                        <Avatar
                            sx={{ m: 1, bgcolor: 'lightgray', width: 32, height: 32 }}
                            src="/broken-image.jpg"
                            className="flex-end ml-4"
                        />
                    </Link>
                )}
            </div>
        </header>
    );
};

const LayerArea = styled.div`
    display: none;
    position: absolute;
    top: 49px;
    right: -11px;
    background-color: white;
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    width: 70px;
    text-align: center;
    z-index: 100;
    &:hover {
        background-color: #dff9fb;
    }
    &.active {
        display: block;
    }
`;

export default Header;
