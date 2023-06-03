import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import filteredVideos from '../modules/FilteredSlice';

const store = configureStore(
    {
        reducer: { filteredVideos },
    },
    composeWithDevTools()
);

export default store;
