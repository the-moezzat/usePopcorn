import { useState } from 'react';
import { Box } from './Box';
import { Main } from './Main';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import { Navbar } from './Navbar';
import { Logo } from './Logo';
import Search from './Search';
import { NumResult } from './NumResult';
import MovieDetails from './MovieDetails';
import { MovieList } from './MovieList';
import { WatchedSummary } from './WatchedSummary';
import { WatchedList } from './WatchedList';
import { useMovies } from '../hooks/useMovies';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export interface Mov {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMov {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface MovieDetail {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Released: string;
  Response: boolean;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: number;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { movies, loading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState<WatchedMov[]>(
    [],
    'watched'
  );

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleResetSelectMovie() {
    setSelectedId(null);
  }

  function handleAddToWatched(movie: WatchedMov) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id: string) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onBack={handleResetSelectMovie}
              onAddToWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
