import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import useStore from '../../store';
import styled from 'styled-components'
import { MdLyrics,MdSkipPrevious,MdSkipNext,MdPause,MdPlayArrow,MdOutlineFormatListBulleted,MdEdit } from "react-icons/md";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import PlayerButton from './PlayerButton';
import useRecentlyPlayedFetcher from '../../services/RecentlyPlayedFetcher';
import useRecommendationFetcher from '../../services/recommendationFetcher';



const SeekbarWrapper = styled.div`
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    height: 3rem;
    gap: 1rem;
    z-index: 2;

`

const TrackControls = styled.div`
    display: flex;
`

const Timestamp = styled.p`
    color: white;
    font-size: 1.6rem;
    min-width: 5rem;
    text-align: center;
`

const Slider = styled.input`
    width: 100%;
    height: .4rem;
    -webkit-appearance: none;
    appearance: none;
    background-color: #9d9d9d;
    box-shadow: inset 0 0 0.5rem #00000050;
    border-radius: 0.5rem;
    cursor: pointer;
    outline: none;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.6rem;
        height: 1.6rem;
        background-color: #FFFFFF;
        border-radius: 1rem;
        cursor: pointer;
    }
`

const VolumeWrapper = styled.div`
    position: relative;

    &:hover .volume {
        opacity: 1;
        pointer-events: all;
    }
`

const Volume = styled.div`
    position: absolute;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    width: 9rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #5f5f5f;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.2s;
`

function Player() {
  const playerRef = useRef(null);
  const [playerReady,setPlayerReady] = useState(false);
  const [maxDuration,setMaxDuration] = useState(0);
  const [currentTime,setCurrentTime] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [volume,setVolume] = useState(50);
  const { addRecentlyPlayed } = useRecentlyPlayedFetcher();
  const { fetchRecommendationData } = useRecommendationFetcher();

  const {Music: {musicID,setAlbum,setArtist,setTitle,setDuration,setImage,setSpotifyID,setAlbumID,setArtistID,spotifyID,albumID},
  Player:{setTimestamp,lyricsSeek,actionsBlocked},
  Lyrics: {showLyrics,setShowLyrics,setLyrics}, 
  TrackOrder: {showTrackOrder,setShowTrackOrder},
  TrackCorrection: {showCorrection,setShowCorrection},
  Player: {setLyricsScrolled},
  Tracklist: {tracks},
  RecentlyPlayed: {setChanged}} = useStore();

    useEffect(() => {
        if (playerReady && musicID) {
            let savedToRecents = false;
            const interval = setInterval(() => {
                setCurrentTime(playerRef.current.getCurrentTime());
                setMaxDuration(playerRef.current.getDuration());
                setTimestamp(playerRef.current.getCurrentTime());
                if (playerRef.current.getCurrentTime() > 10 && !savedToRecents) {
                  savedToRecents = true;
                  addRecentlyPlayed(spotifyID,albumID);
                  setChanged(true);
                }
            }, 250);
            return () => clearInterval(interval);
        }
    }, [musicID, playerReady]);

    useEffect(() => {
      if (!playerReady) return;
      if (playing) {
          playerRef.current.playVideo();
      } else {
          playerRef.current.pauseVideo();
      }
    }, [playing]);

    useEffect(() => {
        if (playerReady) {
            playerRef?.current.seekTo(lyricsSeek);
        }
    }, [lyricsSeek])

  const onReady = (event) => {
    playerRef.current = event.target;
    setPlayerReady(true);
    };

  useEffect(() => {
    if (musicID && playerReady) {
      playerRef?.current?.loadVideoById(musicID);
      setPlaying(true);
    }
  }, [musicID]);

  useEffect(() => {
    if (tracks && Object.values(tracks).findIndex((track) => track.trackID === spotifyID) === Object.values(tracks).length - 1) {
      const trackIDs = Object.values(tracks).map((track) => track.trackID);
      let recommendationIDs;
  
      if (trackIDs.length <= 5) {
        recommendationIDs = trackIDs.join(',');
      } else {
        const shuffledIDs = trackIDs.sort(() => 0.5 - Math.random());
        recommendationIDs = shuffledIDs.slice(0, 5).join(',');
      }
  
      fetchRecommendationData(recommendationIDs);
    }
  }, [tracks,musicID,spotifyID])

  const seekTo = (seconds) => {
    playerRef.current.seekTo(seconds, true);
  };

  const changeVolume = (volume) => {
    playerRef.current.setVolume(volume);
  };

  const muteVolume = () => {
    if (!playerReady) return;
    if (playerRef.current.getVolume() == 0 && volume == 0) {
      playerRef.current.setVolume(50);
      setVolume(50)
    } else if (playerRef.current.getVolume() === 0 && volume !== 0) {
      playerRef.current.setVolume(volume);
    } else {
      playerRef.current.setVolume(0);
    }
  }

  const playNext = () => {
    const currentIndex = Array.from(Object.values(tracks)).findIndex((track) => track.trackID === spotifyID);
  
    const nextIndex = currentIndex + 1;
    const nextTrack = tracks[nextIndex];

    setImage(nextTrack.image);
    setArtist(nextTrack.artists.length > 1 ? nextTrack.artists[0].name : nextTrack.artists.name);
    setTitle(nextTrack.trackName);
    setDuration(nextTrack.duration);
    setAlbum(nextTrack.albumName);
    setSpotifyID(nextTrack.trackID);
    setAlbumID(nextTrack.albumID);
    setArtistID(nextTrack.artists.length > 1 ? nextTrack.artists[0].id : nextTrack.artists.id);
    setLyrics(null);
    setLyricsScrolled(false);

  };

  const playPrevious = () => {
    const currentIndex = Array.from(Object.values(tracks)).findIndex((track) => track.trackID === spotifyID);
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      const previousTrack = tracks[previousIndex];
      setImage(previousTrack.image);
      setArtist(previousTrack.artists.length > 1 ? previousTrack.artists[0].name : previousTrack.artists.name);
      setTitle(previousTrack.trackName);
      setDuration(previousTrack.duration);
      setAlbum(previousTrack.albumName);
      setSpotifyID(previousTrack.trackID)
      setAlbumID(previousTrack.albumID)
      setArtistID(previousTrack.artists.length > 1 ? previousTrack.artists[0].id : previousTrack.artists.id)
      setLyrics(null)
      setLyricsScrolled(false)
    }
  }


  return (
    <div style={{opacity: musicID ? 1 : 0, pointerEvents: musicID ? 'all' : 'none', transition: 'opacity 300ms'}}>
      <YouTube onReady={onReady} onEnd={playNext} style={{display: 'none'}}/>
        <SeekbarWrapper>

        <TrackControls>
          <PlayerButton disabled={actionsBlocked} onClick={playPrevious}><MdSkipPrevious /></PlayerButton>
          <PlayerButton disabled={actionsBlocked}onClick={() => setPlaying(!playing)}>{playing ? <MdPause /> : <MdPlayArrow />}</PlayerButton>
          <PlayerButton disabled={actionsBlocked} onClick={playNext}><MdSkipNext /></PlayerButton>
        </TrackControls>

        <Timestamp>{new Date(+Math.floor(currentTime * 1000).toString()).toISOString().slice(14, 19)}</Timestamp>
        <Slider type="range" min={0} max={maxDuration} value={currentTime} onChange={(e) => seekTo(e.target.value)} />
        <Timestamp>{new Date(+Math.floor(maxDuration * 1000).toString()).toISOString().slice(14, 19)}</Timestamp>

        {playerReady && <VolumeWrapper>
          <PlayerButton onClick={muteVolume}>
            {playerRef?.current.getVolume() <= 0 ? <HiVolumeOff /> : <HiVolumeUp />}
          </PlayerButton>
          <Volume className='volume'><Slider type="range" min={0} max={100} value={volume} onChange={(e) => {setVolume(e.target.value); changeVolume(e.target.value)}}/></Volume>
        </VolumeWrapper>}

        <PlayerButton text={'Track Order'} onClick={() => {
                setShowTrackOrder(!showTrackOrder);
                setShowLyrics(false);
                setShowCorrection(false);
                }}><MdOutlineFormatListBulleted />
        </PlayerButton>

        <PlayerButton text={'Correct Track'} onClick={() => {
                setShowCorrection(!showCorrection);
                setShowTrackOrder(false);
                setShowLyrics(false);
                console.log(showCorrection);
                }}><MdEdit />
        </PlayerButton>

        <PlayerButton text={showLyrics ? 'Hide Lyrics' : 'Show Lyrics'} onClick={() => {
                setShowLyrics(!showLyrics);
                setLyricsScrolled(false)
                setShowTrackOrder(false);
                setShowCorrection(false);
                }}><MdLyrics />
        </PlayerButton>

        </SeekbarWrapper>
    </div>
  );
}

export default Player;
