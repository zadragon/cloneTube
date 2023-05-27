import React, { useState } from 'react';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const [text, setText] = useState('');

    const onChangeHandler = e => setText(e.target.value);

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
                    placeholder="  검색"
                    value={text}
                    onChange={onChangeHandler}
                />
                <button>
                    <AiOutlineSearch className="flex text-2xl ml-2 text-gray-600" />
                </button>
            </form>
            <Avatar sx={{ m: 1, bgcolor: 'lightgray' }} src="/broken-image.jpg" className="flex-end ml-4" />
        </header>
    );
};

export default Header;
