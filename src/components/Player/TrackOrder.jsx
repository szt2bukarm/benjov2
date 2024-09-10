import { useEffect, useRef, useState } from "react";
import useStore from "../../store";
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import styled from "styled-components";
import { TransitionGroup,CSSTransition } from "react-transition-group";
import { MdDragIndicator,MdDelete } from "react-icons/md";
import useMusicFetcher from "../../services/musicFetcher";
import NowPlayingIndicator from "./NowPlayingIndicator";
import TrackOrderTitle from "./TrackOrderTitle";
import Loader from "./Loader";

const Wrapper = styled.div`
    
    position: absolute;
    top: 5rem;
    left: 5rem;
    width: 60rem;
    height: 80vh;
    text-align: start;
    z-index: 1;
    overflow-y: scroll;
    user-select: none;

    @media (max-height: 650px) {
    height: 70vh;
  }
`


const Item = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 6.5rem;
    gap: 1rem;
    padding-block: 1rem;
    cursor: pointer;
    will-change: none;


    &:hover {
        opacity: 0.8;
    }
`
const Image = styled.img`
    width: 5rem;
    height: 5rem;
`

const Artist = styled.p`
    font-size: 1.4rem;
    font-weight: 300;
    color: #d4d4d4;
`

const TrackInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const ArtistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 0.5rem;
`

const Drag = styled.div`
    width: 3rem;
    height: 3rem;
    cursor: move;
`

const DragIcon = styled(MdDragIndicator)`
font-size: 3rem;
    color: #ababab;
    `


const DeleteIcon = styled(MdDelete)`
    font-size: 3rem;
    color: #ababab;
    z-index: 3;

    &:hover{
        color: #fff;
    }
`

function TrackOrder() {
    const {Tracklist: {tracks,setTracks}, TrackOrder: {showTrackOrder}} = useStore();
    const { Music: {musicID, setArtist, setTitle, setDuration, setAlbum,setAlbumID,setArtistID, setImage,setSpotifyID,spotifyID } } = useStore();
    const { fetchMusicData } = useMusicFetcher();
    const nowPlayingRef = useRef(null);

    const handleDelete = (e,id) => {
        if (id === spotifyID) return;
        e.stopPropagation();
        const newTracks = Object.values(tracks).filter((track) => track.trackID !== id);
        console.log(newTracks);
        setTracks(newTracks);
    }

    const handleClick = (spotifyID,image,artist,title,duration,album,aID,artistID) => {
      setImage(image);
      setArtist(artist);
      setTitle(title);
      setDuration(duration);
      setAlbum(album);
      setSpotifyID(spotifyID)
      setAlbumID(aID)
      setArtistID(artistID)
      fetchMusicData(
        album,
        artist,
        title,
        duration
      );
    };
    
    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
          return;
        }
    
        const reorderedTracks = Array.from(Object.values(tracks));
        const [movedTrack] = reorderedTracks.splice(source.index, 1);
        reorderedTracks.splice(destination.index, 0, movedTrack);
    
        const newTracksObject = reorderedTracks.reduce((acc, track, index) => {
          acc[index] = track;
          return acc;
        }, {});
    
        setTracks(newTracksObject);
    };



    useEffect(() => {
        try {
            if (tracks) {
                nowPlayingRef?.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
        } catch (error) {
            
        }
      }, [musicID,spotifyID]);
    
    return (
    <TransitionGroup>
        <CSSTransition
            key={showTrackOrder ? 'showTrackOrder' : 'default'}
            timeout={300}
            classNames="fade"
        >
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="track">
                {(provided) => {
                    return <Wrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                    {tracks ?
                    Object.values(tracks).map((track,index) => {
                    return (
                        <Draggable key={track.trackID} draggableId={track.trackID} index={index}>
                            {(provided) => (
                                <Item onClick={() => handleClick(track.trackID,track.image,track.artists.length > 1 ? track.artists[0].name : track.artists.name,track.trackName,track.duration,track.albumName,track.albumID,track.artists.length > 1 ? track.artists[0].id : track.artists.id)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                >
                                
                                <Drag {...provided.dragHandleProps}>
                                    <DragIcon />
                                </Drag>

                                <Image src={track.image} />
                                {spotifyID === track.trackID && <NowPlayingIndicator ref={nowPlayingRef}/>}
                                <TrackInfo>
                                    <TrackOrderTitle sID={track.trackID}>{track.trackName}</TrackOrderTitle>
                                    <ArtistWrapper>
                                    {track.artists.length > 1 ? (
                                        track.artists.map((artist) => {
                                        return <Artist>{artist.name}</Artist>;
                                        })
                                    ) : (
                                        <Artist>{track.artists.name}</Artist>
                                    )}
                                    </ArtistWrapper>
                                </TrackInfo>
                                {spotifyID !== track.trackID && <DeleteIcon onClick={(e) => handleDelete(e,track.trackID)}/>}
                            </Item>
                            )}
                        </Draggable>
                    )
                    }): <Loader /> }
                    {provided.placeholder}
                </Wrapper>  
                }}
            </Droppable>
        </DragDropContext>
         </CSSTransition>
    </TransitionGroup>

    )
}

export default TrackOrder