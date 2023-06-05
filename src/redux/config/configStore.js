import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import profileImgState from '../modules/profileSlice';

const store = configureStore(
    {
        reducer: { profileImgState },
    },
    composeWithDevTools()
);

export default store;
