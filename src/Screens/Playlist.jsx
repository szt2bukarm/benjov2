import styled from "styled-components"
import PlaylistHeader from "../components/Playlists/PlaylistHeader"
import Subheader from "../components/Global/Subheader"
import PlaylistTracks from "../components/Playlists/PlaylistTracks"
import { useEffect } from "react"
import usePlaylistFetcher from "../services/PlaylistFetcher"
import { useLocation, useParams } from "react-router-dom"
import useStore from "../store"
import Loader from "../components/Player/Loader"


const Wrapper = styled.div`
    position: relative;
    width: 100%;
`



function Playlist() {
    const { getPlaylist } = usePlaylistFetcher();
    const {id} = useParams();
    const {Playlists: {loadingPlaylistData, id: playlistID}} = useStore();

    useEffect(() => {
        getPlaylist(id)
    }, [id])

    

    return (
        <Wrapper>
        {
            loadingPlaylistData ? <Loader /> :
            <>
                <PlaylistHeader />
                <PlaylistTracks />
            </>
        }
        </Wrapper>
    )
}

export default Playlist
