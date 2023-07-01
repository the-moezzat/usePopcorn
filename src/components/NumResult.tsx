import { Mov } from './App';

export function NumResult({ movies }: { movies: Mov[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
