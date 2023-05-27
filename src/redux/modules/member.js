// src/redux/modules/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserId: '',
};

const counterSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        addUserInfo: (state, action) => {
            return (state = action.payload);
        },
        logout: () => {
            return initialState;
        },
    },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addUserInfo, logout } = counterSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default counterSlice.reducer;
