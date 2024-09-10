import styled from "styled-components"
import Subheader from "../components/Global/Subheader"
import '../components/Global/Navbar.css'
import useStore from "../store"
import PlaylistItem from "../components/Playlists/PlaylistItem"
import { TransitionGroup,CSSTransition} from "react-transition-group"
import '../transitions.css'
import Loader from "../components/Player/Loader"
import { useEffect } from "react"

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000080;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
`

const InnerWrapper = styled.div`
    position: relative;
    padding: 2rem;
    width: 50rem;
    height: 50rem;
    background-color: #161a1d;
`

const Close = styled(Subheader)`
    position: absolute;
    bottom: 1rem;
    right: 2rem;
  font-size: 1.4rem;
  color: #c6c6c6;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`

const Message = styled.p`
    position: absolute;
    left: 2rem;
    bottom: 2rem;
    font-size: 1.6rem;
    color: #c6c6c6;
    margin-left: auto;
`

function AddToPlaylist() {
    const {Playlists: {playlists,showAddToPlaylist,setShowAddToPlaylist,addToPlaylistID,addToPlaylistTitle,addToPlaylistLoading,addToPlaylistMessage,setAddToPlaylistMessage}} = useStore();

    
    return (
        <TransitionGroup>

        <CSSTransition
            key={showAddToPlaylist ? "show" : "hide"}
            timeout={300}
            classNames="fade"
        >
        {showAddToPlaylist ?
            <Wrapper>
                {addToPlaylistLoading ? <Loader /> : <>
                <InnerWrapper className="border">
                <Subheader>SELECT A PLAYLIST TO ADD {addToPlaylistTitle.toUpperCase()} TO</Subheader>
                    {playlists ? Object.values(playlists).reverse().map((playlist, index) => <PlaylistItem id={playlist._id} key={index} index={index} name={playlist.name} username={playlist.username} tracks={playlist.tracks} />) : <></>}   
                <Close onClick={() => {setShowAddToPlaylist(false);setAddToPlaylistMessage(null)}}>CLOSE</Close>
                <Message>{addToPlaylistMessage}</Message>
                </InnerWrapper>
                </>}
            </Wrapper> : <></>
        }
        </CSSTransition>
        </TransitionGroup>
    )
}

export default AddToPlaylist
