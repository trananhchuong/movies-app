import { BASE_API_URL } from "constants/apiConstants";
import axiosClient from "./axiosClient";

export type GetListMoviesTheatersProps = {
  page?: number;
  keyword?: string;
};

const moviesApi = {
  getListMoviesTheaters: (params?: GetListMoviesTheatersProps) => {
    const url = `${BASE_API_URL}/movie/popular`;
    return axiosClient.get(url, { params });
  },

  getDataDetailMovies: (movieId: string) => {
    const url = `${BASE_API_URL}/movie/${movieId}`;
    return axiosClient.get(url);
  },
};

export default moviesApi;
