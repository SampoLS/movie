import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMoives = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`,
    );

    return response.data;
  },
);

export const fetchAsyncShows = createAsyncThunk(
  "shows/fetchAsyncMovies",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${seriesText}&type=series`,
    );

    return response.data;
  },
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "selectMoiveOrShow/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  },
);

const initialState = {
  movies: {},
  shows: {},
  selectMoiveOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectMoiveOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMoives.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMoives.fulfilled]: (state, { payload }) => {
      console.log("fetch successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMoives.rejected]: () => {
      console.log("rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("fetch successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("fetch successfully");
      return { ...state, selectMoiveOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMoiveOrShow;

export default movieSlice.reducer;
