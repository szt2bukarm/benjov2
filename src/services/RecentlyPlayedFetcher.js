import { useState, useEffect,useCallback } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useRecentlyPlayedFetcher = () => {
  const {RecentlyPlayed: {setAlbums,setTracks,setChanged,setLoading,changed}} = useStore()

    const fetchRecentlyPlayed = useCallback(async () => {
      try {
        if (!changed) return;
        setLoading(true)
        const resp = await fetch(apiLink + '/recentlyPlayed/', {
          method: 'GET',
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
            
          }
        });
        const data = await resp.json();
        setAlbums(data.data.albums)
        setTracks(data.data.tracks)
        setChanged(false)
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }, []);

    const addRecentlyPlayed = useCallback(async (tID,aID) => {
      try {
        const resp = await fetch(apiLink + '/recentlyPlayed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({ "trackID": tID, "albumID": aID })
        });
        const data = await resp.json();
        console.log(data);
      } catch (err) { }
    }, []);


  return { fetchRecentlyPlayed, addRecentlyPlayed };
};

export default useRecentlyPlayedFetcher;