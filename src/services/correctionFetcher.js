import { useState, useEffect,useCallback } from 'react';
import useStore from '../store';
import { apiLink } from './config';

const useCorrectionFetcher = (query) => {
    const { TrackCorrection: {setMessage,setLoading}, Music: {setMusicID}} = useStore();

    const correctTrack = useCallback(async (id,title,artist,duration) => {
      try {
        setLoading(true);
        const resp = await fetch(apiLink + '/music/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({
            "id": id,
            "title": title,
            "artist": artist,
            "duration": duration
          }),
        });
        const data = await resp.json();
        console.log(data);
        if (data.updated) {
          setMusicID(id);
        }
        setMessage(data.message);
      
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, []);

    const reindexTrack = useCallback(async (album,title,artist,duration) => {
      try {
        setLoading(true);
        setMusicID(null);
        setMessage(null);
        const resp = await fetch(apiLink + '/music/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({
            "album": album,
            "title": title,
            "artist": artist,
            "duration": duration
          }),
        });
        const data = await resp.json();
        setMusicID(data.id)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, []);



  return { correctTrack, reindexTrack };
};

export default useCorrectionFetcher;