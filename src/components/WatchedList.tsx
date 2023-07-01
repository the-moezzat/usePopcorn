import { WatchedMov } from './App';
import { Watched } from './Watched';

export function WatchedList({
  watched,
  onDeleteMovie,
}: {
  watched: WatchedMov[];
  onDeleteMovie: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watched
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
