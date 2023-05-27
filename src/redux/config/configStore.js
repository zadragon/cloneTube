import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import userInfo from '../modules/member';

const store = configureStore(
    {
        reducer: { userInfo },
    },
    composeWithDevTools()
);

export default store;
