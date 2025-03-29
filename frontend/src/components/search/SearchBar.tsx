'use client';
import { useDebounce } from 'use-debounce'; // Install with npm install use-debounce
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);

  const { data } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => {
      if (debouncedQuery) {
        return fetch(`/api/search?query=${debouncedQuery}`).then((res) =>
          res.json()
        );
      }
      return Promise.resolve([]);
    },
    enabled: !!debouncedQuery, // Only run if debouncedQuery exists
  });

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
    />
  );
}