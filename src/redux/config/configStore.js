import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import profileImgState from '../modules/profileSlice';
import searchedVideoState from '../modules/searchedSlice';

const store = configureStore(
    {
        reducer: { profileImgState, searchedVideoState },
    },
    composeWithDevTools()
);

export default store;
