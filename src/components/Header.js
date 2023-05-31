import React, { useState } from 'react';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';

const Header = () => {
    const [text, setText] = useState('');
    const [layerOpen, setLayerOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const onChangeHandler = e => setText(e.target.value);

    const logout = () => {
        const result = confirm('정말 로그아웃 하시겠습니까? 🤔');
        if (result) {
            removeCookie('token');
            setLayerOpen(false);
            alert('로그아웃 되었습니다. 🤗');
        }
    };

    return (
        <header className="w-full flex mt-2 justify-between items-center">
            <Link to="/" className="flex items-center">
                <AiFillYoutube className="text-4xl mr-2 text-logo" />
                <h1 className="font-semibold text-3xl">LoneTube</h1>
            </Link>
            <form className="w-full flex justify-center h-11">
                <input
                    className="w-7/12 p-1 rounded-full border border-gray-300"
                    type="text"
                    placeholder="    검색"
                    value={text}
                    onChange={onChangeHandler}
                />
                <button>
                    <AiOutlineSearch className="flex text-3xl ml-2 text-gray-500" />
                </button>
            </form>
            <div className="relative">
                {cookie.token ? (
                    <>
                        <Link to="/user/mypage" className=" " onMouseEnter={() => setLayerOpen(true)}>
                            <Avatar
                                sx={{ m: 1, bgcolor: 'lightgray', width: 32, height: 32 }}
                                src="/broken-image.jpg"
                                className="flex-end ml-4"
                            />
                        </Link>
                        <LayerArea
                            className={`text-center ${layerOpen && 'active'}`}
                            onMouseLeave={() => setLayerOpen(false)}
                        >
                            <button className=" text-xs" onClick={logout}>
                                로그아웃
                            </button>
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
    &:hover {
        background-color: #dff9fb;
    }
    &.active {
        display: block;
    }
`;

export default Header;
