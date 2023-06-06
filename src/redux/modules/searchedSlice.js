import { createSlice } from '@reduxjs/toolkit';

const searchedSlice = createSlice({
    name: 'searchedVideoState',
    initialState: '',
    reducers: {
        SearchVideos: (state, action) => {
            console.log(action.payload);
            return (state = action.payload);
        },
    },
});

export const { SearchVideos } = searchedSlice.actions;
export default searchedSlice.reducer;
