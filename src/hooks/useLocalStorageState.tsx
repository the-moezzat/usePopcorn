import { useEffect, useState } from 'react';

type LocalStorageState<S> = [
  initialState: S,
  setState: React.Dispatch<React.SetStateAction<S>>
];

export function useLocalStorageState<T>(
  initialState: T | (() => T),
  key: string
): LocalStorageState<T> {
  const [value, setValue] = useState<T>(function () {
    const watchedMovies = JSON.parse(
      window.localStorage.getItem(key) as string
    );

    console.log(watchedMovies);
    return watchedMovies ? watchedMovies : initialState;
  });

  useEffect(
    function () {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
