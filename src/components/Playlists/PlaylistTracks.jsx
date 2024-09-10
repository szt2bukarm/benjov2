import { useEffect, useRef, useState } from "react";
import useStore from "../../store";
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import styled from "styled-components";
import { MdDragIndicator,MdDelete } from "react-icons/md";
import Track from "../Global/Track";
import Subheader from "../Global/Subheader";
import {gsap} from 'gsap/gsap-core'
import usePlaylistFetcher from "../../services/PlaylistFetcher";

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    margin-top: -5rem;
    /* transform: translateY(-5rem); */
    z-index: 2;

    width: 100%;
    text-align: start;
    /* overflow-y: scroll; */
    user-select: none;

    @media (max-height: 650px) {
    height: 70vh;
  }
`


const Drag = styled.div`
    width: 3rem;
    height: 3rem;
    cursor: move;
`

const DragIcon = styled(MdDragIndicator)`
    position: inline-block;
    font-size: 3rem;
    color: #ababab;
`

const TrackWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const DeleteIcon = styled(MdDelete)`
    font-size: 2.5rem;
    color: #ababab;
    z-index: 3;

    &:hover{
        color: #fff;
    }
`

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const Action = styled(Subheader)`
  font-size: 1.4rem;
  color: #c6c6c6;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`


function PlaylistTracks() {
    const {Playlists: {tracks,id,setTracks,username}, User: {username: user}} = useStore();
    const [edit,setEdit] = useState(false);
    const [unEditedTracks,setUnEditedTracks] = useState(tracks);
    const tracksRef = useRef([]);
    const { updatePlaylist } = usePlaylistFetcher();
    
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

    const saveChanges = () => {
        const ids = Object.values(tracks).map(track => track.trackID);
        setEdit(false);
        updatePlaylist(id,ids);
    }

    const handleDelete = (id) => {
        const newTracks = Object.values(tracks).filter((track) => track.trackID !== id);
        setTracks(newTracks);
        if (newTracks.length == 0) {
            console.log(newTracks.length);
            setTracks(unEditedTracks)
            setEdit(false);
        }
    }

    useEffect(() => {
        if (edit) return;
        gsap.set([tracksRef.current] , {
            opacity: 0,
            y: 25,
        })
        setTimeout(() => {
            gsap.to([tracksRef.current] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        }, 200);
    },[tracks])
    
    return (
        <>
        <DragDropContext  onDragEnd={handleDragEnd}>
            <Droppable droppableId="track">
                {(provided) => {
                    return <Wrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                    <HeaderWrapper ref={el => tracksRef.current[0] = el}>
                        <Subheader>TRACKS</Subheader>
                        <Actions>
                            {(!edit && user == username) && <Action onClick={() => setEdit(true)}>EDIT PLAYLIST</Action>}
                            {edit && <>
                                {tracks !== unEditedTracks && <Action onClick={saveChanges}>SAVE</Action>}
                                <Action onClick={() => {setEdit(false);setTracks(unEditedTracks)}}>DISCARD</Action>

                            </>}
                        </Actions>
                    </HeaderWrapper>
                    <Column>
                    {tracks ?
                    Object.values(tracks).map((track,index) => {
                    return (
                        <Draggable key={track.trackID} draggableId={track.trackID} index={index}>
                            {(provided) => (
                                <TrackWrapper ref={provided.innerRef}
                                {...provided.draggableProps}>
                                {(user == username && edit) && 
                                <Drag {...provided.dragHandleProps}>
                                    <DragIcon />
                                </Drag>
                                }
                                     <Track ref={el => tracksRef.current[index + 1] = el} key={track?.trackID} index={index}
                                    image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={tracks}/>
                                    {edit && <DeleteIcon onClick={() => handleDelete(track?.trackID)}><MdDelete /></DeleteIcon>}
                                </TrackWrapper>
                            )}
                        </Draggable>
                    )
                    }): null }
                    {provided.placeholder}
                        </Column>
                </Wrapper>  
                }}
            </Droppable>
        </DragDropContext>
        </>
    )
}

export default PlaylistTracks