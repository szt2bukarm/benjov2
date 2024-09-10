import styled from "styled-components"
import Subheader from "../components/Global/Subheader"
import CreatePlaylist from "../components/Playlists/CreatePlaylist"
import useStore from "../store"
import Loader from "../components/Player/Loader"
import PlaylistItem from "../components/Playlists/PlaylistItem"
import { useEffect, useRef } from "react"
import { gsap } from "gsap/gsap-core"
import { useNavigate } from "react-router-dom"

const Wrapper = styled.div`
    position: relative;
    padding-inline: 3rem;
    margin-bottom: 2rem;
`

const HeaderWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 2rem; */
    user-select: none;
    z-index: 4;
`

const CreateButton = styled(Subheader)`
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
`;

function Playlists() {
    const { Playlists: {playlists,setShowCreatePlaylist, showCreatePlaylist, loading}} = useStore();
    const playlistsRef = useRef([])


        useEffect(() => {
            if (!playlists) return
            gsap.set([playlistsRef.current] , {
                opacity: 0,
                y: 25,
            })
            gsap.to([playlistsRef.current] , {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                ease: "power3.out",
            })
        },[playlists])

    return (
        <Wrapper>
            {loading ? <Loader /> : <>
                <HeaderWrapper ref={el => (playlistsRef.current[0] = el)}>
                <Subheader>MY PLAYLISTS</Subheader>
                <CreateButton onClick={() => setShowCreatePlaylist(!showCreatePlaylist)}>+ CREATE PLAYLIST</CreateButton>
                {showCreatePlaylist && <CreatePlaylist />}
            </HeaderWrapper>
            </>}

            <Column>
            {playlists ? Object.values(playlists).reverse().map((playlist, index) => <PlaylistItem ref={el => (playlistsRef.current[index + 1] = el)} id={playlist._id} key={index} index={index} name={playlist.name} username={playlist.username} tracks={playlist.tracks} publicplaylist={playlist.public}/>) : <></>}   
            </Column>
        </Wrapper>
    )
}

export default Playlists
