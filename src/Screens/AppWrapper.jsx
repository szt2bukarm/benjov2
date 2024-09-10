import styled from "styled-components"
import Sidebar from "../components/Global/Sidebar"
import Navbar from "../components/Global/Navbar"
import Homepage from "./Homepage"
import useHomepageFetcher from "../services/homepageFetcher"
import { useEffect, useRef, useState } from "react"
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom'
import '../components/Global/Navbar.css'
import TopTracks from "../components/Homepage/TopTracks"
// import Genres from "../components/Global/Genres"
import useStore from "../store"
import Genre from "./Genre"
import Album from "./Album"
import Artist from "./Artist"
import RecentlyPlayed from "./RecentlyPlayed"
import FavoriteAlbums from "./FavoriteAlbums"
import FavoriteTracks from "./FavoriteTracks"
import Settings from "./Settings"
import Playlists from "./Playlists"
import usePlaylistFetcher from "../services/PlaylistFetcher"
import Playlist from "./Playlist"
import AddToPlaylist from "./AddToPlaylist"
import PublicPlaylists from "./PublicPlaylists"

const Wrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 25rem 1fr;
    height: 100vh;

    @media (max-width: 1500px) {
        grid-template-columns: 1fr;
    }
`

const FadeOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    z-index: 5;
`

const ContentWrapper = styled.div`
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`

const AddToPlaylistWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

`

function AppWrapper() {
    const { fetchNewReleases, fetchTopTracks,fetchGenres,fetchFavoriteIDs } = useHomepageFetcher();
    const {Search: {searchOpen,setSearchOpen}, Sidebar: {showSidebar,setShowSidebar},User: {guest}} = useStore();
    const { fetchPlaylists, fetchPublicPlaylists} = usePlaylistFetcher()

    useEffect(() => {
        fetchNewReleases();
        fetchTopTracks();
        fetchGenres();
        fetchFavoriteIDs();
        fetchPlaylists();
        fetchPublicPlaylists();
    }, [])


    return (
        <Wrapper>
            <AddToPlaylistWrapper>
                <AddToPlaylist />
            </AddToPlaylistWrapper>
            {(searchOpen || showSidebar) && <FadeOverlay onClick={() => {setSearchOpen(false);setShowSidebar(false)}}/>}
            <Sidebar />
            <ContentWrapper>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} index/>
                    <Route path="/toptracks" element={<TopTracks />} />
                    <Route path="/genres" element={<Genre />} />
                    <Route path="/album/:id" element={<Album />} />
                    <Route path="/artist/:id" element={<Artist />} />
                    <Route path="/playlist/:id" element={<Playlist />} />
                    <Route path="/playlists" element={<PublicPlaylists />} />
                    {!guest && <>
                        <Route path="/recents" element={<RecentlyPlayed />} />
                        <Route path="/likedalbums" element={<FavoriteAlbums />} />
                        <Route path="/likedtracks" element={<FavoriteTracks />} />
                        <Route path="/myplaylists" element={<Playlists />} />
                        <Route path="/settings" element={<Settings />} />
                    </>}
                    <Route path="*" element={<Homepage />} />
                </Routes>
            </ContentWrapper>
        </Wrapper>
    )
}

export default AppWrapper
