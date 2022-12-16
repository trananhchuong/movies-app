export const BASE_API_URL = "https://api.themoviedb.org/3/";

export const BASE_MOVIES_SECTION_URL = "movie";
export const BASE_TV_SECTION_URL = "tv";

export function getImageFullPath(imageRelativePath: string) {
  return `https://image.tmdb.org/t/p/original/${imageRelativePath}`;
}

export function getURLWithoutCORS(url: string) {
  return `https://corsproxy.io/?${url}`;
}
