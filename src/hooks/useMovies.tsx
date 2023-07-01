import { useEffect, useState } from 'react';
import { Mov } from '../components/App';

const KEY = '74801e57';

export function useMovies(query: string) {
  const [movies, setMovies] = useState<Mov[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error.name !== 'AbortError') setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, loading, error };
}
