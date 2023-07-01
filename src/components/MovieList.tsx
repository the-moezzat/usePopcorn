import { Mov } from './App';
import { Movie } from './Movie';

export function MovieList({
  movies,
  onSelectMovie,
}: {
  movies: Mov[];
  onSelectMovie: (id: string) => void;
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
