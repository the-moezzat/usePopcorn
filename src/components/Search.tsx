import { useEffect, useRef } from 'react';

export default function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(
    function () {
      function enter(e: KeyboardEvent) {
        if (document.activeElement === inputEl.current) return;

        if (e.key === 'Enter') {
          inputEl.current?.focus();
          setQuery('');
        }
      }

      document.addEventListener('keydown', enter);

      inputEl.current?.focus();

      return function () {
        document.removeEventListener('keydown', enter);
      };
    },
    [setQuery]
  );

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}
