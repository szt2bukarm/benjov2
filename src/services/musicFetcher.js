import { useCallback, useRef } from 'react';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';
import useLyricsFetcher from './lyricsFetcher';
import { apiLink } from './config';

const useMusicFetcher = () => {
  const {
    Music: { setMusicID,setSearching },
    Album: { setAlbumTracks, setAlbumData, setAlbumLoading },
    Artist: { setArtistData, setArtistTopTracks, setArtistAlbums, setLoading },
  } = useStore();

  const navigate = useNavigate();

  const albumAbortControllerRef = useRef(null);
  const artistAbortControllerRef = useRef(null);
  const musicAbortControllerRef = useRef(null);

  const fetchMusicData = useCallback(async (album, artist, title, duration) => {
    if (musicAbortControllerRef.current) {
      musicAbortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    musicAbortControllerRef.current = abortController;

    try {
      setSearching(true);
      console.log("fing");
      const resp = await fetch(apiLink + '/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

        },
        body: JSON.stringify({ 
          album: album,
          artist: artist,
          title: title,
          duration: duration,
        }),
        signal: abortController.signal,
      });

      const data = await resp.json();
      setMusicID(data.id);
      setSearching(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Music fetch aborted');
      } else {
        console.log(err);
      }
    }

  }, []);

  const fetchAlbumData = useCallback(async (id) => {
    if (albumAbortControllerRef.current) {
      albumAbortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    albumAbortControllerRef.current = abortController;

      try {
        setAlbumLoading(true);
        const resp = await fetch(apiLink + '/music/album', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({ id: id }),
          signal: abortController.signal,
        });

        const data = await resp.json();
        setAlbumData(data.data.info);
        setAlbumTracks(data.data.tracks);
        setAlbumLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Album fetch aborted');
        } else {
          navigate('/');
        }
      }

  }, []);

  const fetchArtistData = useCallback(async (id) => {
    if (artistAbortControllerRef.current) {
      artistAbortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    artistAbortControllerRef.current = abortController;

      try {
        setLoading(true);
        const resp = await fetch(apiLink + '/music/artist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({ id: id }),
          signal: abortController.signal,
        });

        const data = await resp.json();
        setArtistData(data.data.info);
        setArtistTopTracks(data.data.topTracks);
        setArtistAlbums(data.data.albums);
        // setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Artist fetch aborted');
        } else {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
  }, []);

  return { fetchMusicData, fetchAlbumData, fetchArtistData };
};

export default useMusicFetcher;
