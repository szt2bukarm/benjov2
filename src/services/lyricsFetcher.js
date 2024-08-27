import { useState, useEffect,useCallback, useRef } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useLyricsFetcher = (album, artist, title, duration) => {
  const {Lyrics: {setLyrics,setLyricsLoading}} = useStore()
  const lyricsAbortControllerRef = useRef(null);

    const fetchLyricsData = useCallback(async (album, artist, title, duration) => {
      if (lyricsAbortControllerRef.current) {
        lyricsAbortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      lyricsAbortControllerRef.current = abortController;

      try {
        const resp = await fetch(apiLink + '/lyrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "album": album,
              "artist": artist,
              "title": title,
              "duration": duration
           }),
           signal: abortController.signal
        });
        const data = await resp.json();
        console.log("lyrics fetch :D");
        setLyrics(data.data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Music fetch aborted');
        } else {
          console.log(err);
        }
      }
    }, [album, artist, title, duration]);


  return { fetchLyricsData };
};

export default useLyricsFetcher;