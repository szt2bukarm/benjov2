import { useState, useEffect,useCallback } from 'react';
import useStore from '../store';
import { apiLink } from './config';
import { useNavigate } from 'react-router-dom';

const usePlaylistFetcher = () => {
  const {Playlists: {setPlaylists,setLoading,setLoadingPlaylistData,setName,setUsername,setID,setTrackNo,setTracks,setAddToPlaylistLoading,setAddToPlaylistMessage,setPublicPlaylists,setIsPublic}} = useStore()
  const navigate = useNavigate();

    const fetchPlaylists = useCallback(async () => {
      try {
        setLoading(true);
        const resp = await fetch(apiLink + '/playlists/', {
          method: 'GET',
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
            
          }
        });
        const data = await resp.json();
        setPlaylists(data.data.playlists)
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, []);

    const fetchPublicPlaylists = useCallback(async () => {
      try {
        setLoading(true);
        const resp = await fetch(apiLink + '/playlists/public', {
          method: 'GET',
        });
        const data = await resp.json();
        console.log(data.data.playlists);
        setPublicPlaylists(data.data.playlists)
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, []);

    const createPlaylist = useCallback(async (name) => {
      try {
        setPlaylists(null);
        setLoading(true);
        const resp = await fetch(apiLink + '/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({"name": name}),
        });
        const data = await resp.json();
        await fetchPlaylists();
        await fetchPublicPlaylists();
      } catch (err) { }
    }, []);

    const deletePlaylist = useCallback(async (playlistID) => {
      try {
        setPlaylists(null);
        setLoading(true);
        const resp = await fetch(apiLink + '/playlists', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),

          },
          body: JSON.stringify({"playlistID": playlistID}),
        });
        const data = await resp.json();
        await fetchPlaylists();
        await fetchPublicPlaylists();
      } catch (err) { }
    }, []);

    const getPlaylist = useCallback(async (playlistID) => {
      try {
        setLoadingPlaylistData(true);
        console.log(playlistID);
        const resp = await fetch(apiLink + '/playlists/getplaylist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({"id": playlistID}),
        });
        const data = await resp.json();
        console.log(data);
        setName(data.data.info.name)
        setUsername(data.data.info.username)
        setID(data.data.info.id)
        setTrackNo(data.data.info.tracks)
        setTracks(data.data.tracks)
        setIsPublic(data.data.info.public)
        setLoadingPlaylistData(false);
      } catch (err) { 

        navigate('/');
      }
    }, []);

    const addToPlaylist = useCallback(async (playlistID,track) => {
      try {
        setAddToPlaylistLoading(true);
        console.log(playlistID);
        const resp = await fetch(apiLink + '/playlists/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({"id": playlistID,"track": track}),
        });
        const data = await resp.json();
        console.log(data);
        setAddToPlaylistMessage(data.message);
        setAddToPlaylistLoading(false);
        await fetchPlaylists();
        await fetchPublicPlaylists();
      } catch (err) { }
    }, []);

    const updatePlaylist = useCallback(async (playlistID,tracks) => {
      try {
        setLoadingPlaylistData(true);
        console.log(playlistID);
        const resp = await fetch(apiLink + '/playlists/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({"id": playlistID,"tracks": tracks}),
        });
        const data = await resp.json();
        console.log(data);
        setLoadingPlaylistData(false);
        await getPlaylist(playlistID);
        await fetchPlaylists();
        await fetchPublicPlaylists();
      } catch (err) { }
    }, []);

    const updatePlaylistVisibility = useCallback(async (playlistID) => {
      try {
        setLoadingPlaylistData(true);
        const resp = await fetch(apiLink + '/playlists/updateVisibility', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({"id": playlistID}),
        });
        const data = await resp.json();
        console.log(data);
        setLoadingPlaylistData(false);
        await getPlaylist(playlistID);
        await fetchPublicPlaylists();
        await fetchPlaylists();
      } catch (err) { }
    }, []);

  return { fetchPlaylists,fetchPublicPlaylists, createPlaylist, deletePlaylist,getPlaylist,addToPlaylist,updatePlaylist, updatePlaylistVisibility };
};

export default usePlaylistFetcher;