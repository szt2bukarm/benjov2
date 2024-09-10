import styled from "styled-components";
import { forwardRef, useState } from "react";
import { MdCheck, MdClose, MdDelete } from "react-icons/md";
import usePlaylistFetcher from "../../services/PlaylistFetcher";
import useStore from "../../store";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 100%;
    /* height: 7rem; */
    background-color: #161a1d;
    border-radius: .5rem;
    /* margin-block: 1rem; */
    cursor: pointer;

    &:hover {
        background-color: #222a2d;
    }
`

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
`;

const Title = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
  margin-bottom: .2rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;



const Info = styled.p`
  font-size: 1.2rem;
  color: #c6c6c6;
`;


const Delete = styled.div`
  position: relative;
  /* margin-right: 2rem; */
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  transform: translateY(2px);

  &:hover {
    color: #c6c6c6;
  }

  &:hover .text {
    opacity: 1;
  }
`

const TextWrapper = styled.div`
    position: absolute;
    opacity: 0;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    /* width: 9rem; */
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #5f5f5f;
    border-radius: 1rem;
    pointer-events: none;
    transition: all .1s;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`

const Text = styled.p`
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
`

const PlaylistItem = forwardRef(({ id,index, name,username,tracks,publicplaylist }, ref) => {
    const {Playlists: {showAddToPlaylist,addToPlaylistID}, User:{username: user}} = useStore();
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const {deletePlaylist,addToPlaylist} = usePlaylistFetcher();
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = () => {
        if (tracks.length == 0 && !showAddToPlaylist) return
        if (!showAddToPlaylist) navigate(`/playlist/${id}`)
        if (showAddToPlaylist) addToPlaylist(id,addToPlaylistID)
    }

    if (tracks.length == 0 && location.pathname == '/playlists') return null;

    return (
      <Wrapper onClick={clickHandler} key={index} ref={ref} style={{cursor: tracks.length == 0 && !showAddToPlaylist ? "not-allowed" : "pointer"}}>
        <InfoWrapper>
          <Title>{name}</Title>
          <Info>Playlist by: {username} - {tracks.length} tracks - {publicplaylist ? "public" : "private"}</Info>
        </InfoWrapper>
        
      {!showAddToPlaylist && <Actions>
        {(!deleteConfirm && user == username && location.pathname != '/playlists') && 
        <Delete onClick={(e) => {e.stopPropagation();setDeleteConfirm(true)}}>
          <MdDelete />
          <TextWrapper className="text"><Text>Delete</Text></TextWrapper>
        </Delete>
        }

        {deleteConfirm && 
        <>
        <Delete onClick={(e) => {e.stopPropagation();deletePlaylist(id)}}>
            <MdCheck />
            <TextWrapper className="text"><Text>Confirm</Text></TextWrapper>
        </Delete>

        <Delete onClick={(e) => {e.stopPropagation();setDeleteConfirm(false)}}>
            <MdClose />
            <TextWrapper className="text"><Text>Cancel</Text></TextWrapper>
        </Delete>
        </>
        }
        </Actions>
}      </Wrapper>
    );
  });
  

export default PlaylistItem
