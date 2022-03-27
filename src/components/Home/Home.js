import { useEffect } from "react";
import { useDispatch } from "react-redux";

import MovieListing from "../MovieListing/MovieListing";
import {
  fetchAsyncMoives,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMoives());
    dispatch(fetchAsyncShows());
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"> </div>
      <MovieListing />
    </div>
  );
}
