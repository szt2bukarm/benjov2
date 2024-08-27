import { useState, useEffect,useCallback, useRef } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useFavoritesFetcher = () => {
  const {Favorites: {setAlbums,setTracks,setLoadingAlbums,setLoadingTracks,setChangedAlbums,setChangedTracks,changedTracks,changedAlbums,setAlbumIDs,setTrackIDs}} = useStore()

    const fetchFavoriteTracks = useCallback(async () => {
      try {
        if (!changedTracks) return;
        setLoadingTracks(true)
        const resp = await fetch(apiLink + '/favorites/tracks', {
          method: 'GET',
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
        const data = await resp.json();
        console.log(data);
        setTracks(data.data)
        setChangedTracks(false)
        setLoadingTracks(false)
      } catch (err) {
        console.log(err);
      }
    }, []);

    const fetchFavoriteAlbums = useCallback(async () => {
      try {
        if (!changedAlbums) return;
        setLoadingAlbums(true)
        const resp = await fetch(apiLink + '/favorites/albums', {
          method: 'GET',
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
        const data = await resp.json();
        console.log(data);
        setAlbums(data.data)
        setChangedAlbums(false)
        setLoadingAlbums(false)
      } catch (err) {
        console.log(err);
      }
    }, []);

    const trackAbortControllerRef = useRef(null);
    const addFavoriteTrack = useCallback(async (id) => {

      if (trackAbortControllerRef.current) {
        trackAbortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      trackAbortControllerRef.current = abortController;

      try {
        const resp = await fetch(apiLink + '/favorites/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ "track": id }),
          signal: abortController.signal
        });
        const data = await resp.json();
        console.log(data);
        setTrackIDs(data.data);
      } catch (err) { 
        if (err.name === 'AbortError') {
          console.log('Request was canceled');
        } else {
          console.log(err);
        }
      }
    }, []);

    const albumAbortControllerRef = useRef(null);
    const addFavoriteAlbum = useCallback((id) => {
    
      // Cancel the previous request if it exists
      if (albumAbortControllerRef.current) {
        albumAbortControllerRef.current.abort();
      }
    
      // Create a new AbortController for the current request
      const abortController = new AbortController();
      albumAbortControllerRef.current = abortController;
    
      // Make the request
      const executeRequest = async () => {
        try {
          const resp = await fetch(apiLink + '/favorites/album', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ album: id }),
            signal: abortController.signal, // Pass the signal to the fetch request
          });
          const data = await resp.json();
          console.log(data);
          setAlbumIDs(data.data);
        } catch (err) {
          if (err.name === 'AbortError') {
            console.log('Request was canceled');
          } else {
            console.error(err);
          }
        }
      };
    
      executeRequest();
    }, []);


  return { fetchFavoriteTracks, fetchFavoriteAlbums, addFavoriteTrack, addFavoriteAlbum };
};

export default useFavoritesFetcher;