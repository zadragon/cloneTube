import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import filteredVideos from '../modules/FilteredSlice';
import profileImgState from '../modules/profileSlice';

const store = configureStore(
    {
        reducer: { filteredVideos, profileImgState },
    },
    composeWithDevTools()
);

export default store;
