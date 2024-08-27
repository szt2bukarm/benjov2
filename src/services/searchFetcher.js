import { useCallback, useRef } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useSearchFetcher = () => {
  const { Search: { setTracks, setAlbums, setArtists,setSearching,searchQuery } } = useStore();
  const abortControllerRef = useRef(null);

  const fetchSearchData = useCallback(async (query) => {
    // if (query) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setSearching(true);
      const resp = await fetch(apiLink + '/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ "query": query }),
        signal: abortController.signal
      });
      console.log(localStorage.getItem('token'));

      const data = await resp.json();

      // Only set data if the request wasn't aborted
      if (!abortController.signal.aborted) {
        setAlbums(data.album);
        setArtists(data.artist);
        setTracks(data.track);
        setSearching(false);
      }

    } catch (err) {
      // Only handle non-abort errors
      if (err.name !== 'AbortError') {
        console.log(err);
      }
    }
  }, [setTracks, setAlbums, setArtists]);

  return { fetchSearchData };
};

export default useSearchFetcher;
