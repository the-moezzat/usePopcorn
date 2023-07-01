import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import { MovieDetail, WatchedMov } from './App';
import { Loader } from './Loader';

const KEY = '74801e57';

export default function MovieDetails({
  selectedId,
  onBack,
  onAddToWatched,
  watched,
}: {
  selectedId: string;
  onBack: () => void;
  onAddToWatched: (movie: WatchedMov) => void;
  watched: WatchedMov[];
}) {
  const [movie, setMovie] = useState<MovieDetail>(Object);
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const count = useRef(0);

  function handleAddWatched() {
    const watchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(' ')[0]),
      imdbRating: Number(movie.imdbRating),
      userRating: +rating,
      countDecision: count.current,
    };

    onAddToWatched(watchedMovie);
    onBack();
  }

  let isWatched = false;
  watched.forEach((watchedMovie) => {
    if (watchedMovie.imdbID === movie.imdbID) isWatched = true;
  });

  useEffect(
    function () {
      if (rating) count.current++;
    },
    [rating]
  );

  useEffect(() => {
    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie]);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await res.json();

      setMovie(data);
      setLoading(false);
    }

    fetchMovie();
  }, [selectedId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onBack}>
          &larr;
        </button>
        <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            {movie.imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setRating}
                defaultRating={rating}
              />

              {rating > 0 && (
                <button className="btn-add" onClick={handleAddWatched}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated with movie <span>⭐️</span>
            </p>
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
    </div>
  );
}
