export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
};

export type TV = {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
};

export type TrendingResponse = {
  results: (Movie | TV)[];
  page: number;
  total_pages: number;
  total_results: number;
};

export const useTMDB = () => {
  const { public: { tmdbToken } } = useRuntimeConfig();

  if (!tmdbToken) {
    throw new Error('TMDB_TOKEN is not defined in runtime config');
  }
  const base = 'https://api.themoviedb.org/3';
  const headers = { Authorization: `Bearer ${tmdbToken}` };

  const getTrending = async (type: 'movie' | 'tv', page = 1) =>
    $fetch<TrendingResponse>(`${base}/trending/${type}/day?page=${page}`, { headers });

  const getDetails = async (type: string, id: string) =>
    $fetch<Movie | TV>(`${base}/${type}/${id}`, { headers });

  return { getTrending, getDetails };
};
