import { useState, useEffect,useCallback } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useHomepageFetcher = (query) => {
  const {NewReleases: {setNewReleases}, TopTracks: {setTopTracks}, Genres: {setGenres}, Favorites: {setAlbumIDs,setTrackIDs}} = useStore()

    const fetchNewReleases = useCallback(async () => {
      try {
        const resp = await fetch(apiLink + '/recommendation/newreleases', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }});
        const data = await resp.json();
        console.log(data);
        setNewReleases(data.data)
      } catch (err) {
        console.log(err);
      }
    }, []);

    const fetchTopTracks = useCallback(async () => {
    try {
        const resp = await fetch(apiLink + '/recommendation/toptracks', {
          method: 'GET',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
        const data = await resp.json();
        console.log(data);
        setTopTracks(data.data)
        } catch (err) {
        console.log(err);
        }
    }, []);

    const fetchGenres = useCallback(async () => {
      try {
          const resp = await fetch(apiLink + '/recommendation/genres', {
            method: 'GET',
            headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
          });
          const data = await resp.json();
          console.log(data);
          setGenres(data.data)
          } catch (err) {
          console.log(err);
          }
      }, []);

      const fetchFavoriteIDs = useCallback(async () => {
        try {
          const resp = await fetch(apiLink + '/favorites/ids', {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
          });
          const data = await resp.json();
          setAlbumIDs(data.data.albums)
          setTrackIDs(data.data.tracks)
        } catch (err) {
          console.log(err);
        }
      }, []);


  return { fetchNewReleases,fetchTopTracks,fetchGenres,fetchFavoriteIDs };
};

export default useHomepageFetcher;