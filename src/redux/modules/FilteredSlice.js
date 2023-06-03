import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: [],
    filteredVideos: [],
    isLoading: true,
    search: '',
};

const FilteredSlice = createSlice({
    name: 'filteredVideos',
    initialState,
    reducers: {
        searchVideos: (state, action) => {
            const filteredVideos = state.videos.filter(video =>
                video.Title.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                filteredVideos: action.payload.length > 0 ? filteredVideos : [...state.videos],
            };
        },
    },
});

export const { filteredVideos } = FilteredSlice.actions;
export default FilteredSlice.reducer;
