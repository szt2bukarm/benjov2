import styled from "styled-components"
import './Navbar.css'
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef, useState } from "react";
import useStore from "../../store";
import Subheader from "./Subheader";
import Loader from "../Player/Loader";
import Track from "./Track";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import useRecommendationFetcher from "../../services/recommendationFetcher";
import Album from "./Album";
import { useNavigate } from "react-router-dom";
import Artist from "./Artist";

const Wrapper = styled.div`
    position: absolute;
    top: 5rem;
    height: 0;
    width: 100%;
    background-color: #161a1d;
    overflow-x: visible;

`

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 2rem;
`

const SelectorWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
`

const SelectorItem = styled.p`
    font-size: 1.8rem;
    font-weight: 400;
    color: #c6c6c6;
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 100ms;

    &:hover {
        color: #fff;
    }
    

    &.active {
        color: #fff;
    }
`

const Scrollable = styled.div`
    height: 100%;
    overflow-y: scroll;
`

function Search() {
    const wrapperRef = useRef(null);
    const {Search: {albums, artists, tracks, searching,setSearchOpen},Music: {spotifyID}} = useStore();
    const [tab, setTab] = useState("tracks");

    useEffect(() => {
        gsap.to(wrapperRef.current, {
            duration: 0.4,
            height: '60rem',
            ease: 'power3.out',
        })

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setSearchOpen(false);
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [])

    return (
        <Wrapper ref={wrapperRef} className="border">
            {searching ? <Loader /> : (
                <InnerWrapper>
                    <SelectorWrapper>
                        <SelectorItem className={tab === "tracks" ? "active" : ""} onClick={() => setTab("tracks")}>TRACKS</SelectorItem>
                        <SelectorItem className={tab === "albums" ? "active" : ""} onClick={() => setTab("albums")}>ALBUMS</SelectorItem>
                        <SelectorItem className={tab === "artists" ? "active" : ""} onClick={() => setTab("artists")}>ARTISTS</SelectorItem>
                    </SelectorWrapper>

                    {tab === "tracks" ? 
                    <Scrollable>
                        {
                            tracks && tracks.map((track,index) => <Track key={track.id} index={index} image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} fromSearch={true} />)
                        }
                    </Scrollable>
                     : <></>}

                    {tab === "albums" ? 
                    <Scrollable>
                        {
                            albums && albums.map((album) => <Album key={album.id} onClick={() => handleClickAlbum(album.id)} index={album.id} image={album.image} id={album.id} name={album.name} artists={album.artists} />)
                        }
                    </Scrollable>
                    : <></>}

                    {tab === "artists" ?
                        <Scrollable>
                        {
                            artists && artists.map((artist,index) => <Artist key={artist.id} index={index} id={artist.id} image={artist.image} name={artist.name} />)
                        }
                    </Scrollable>: <></>}
                </InnerWrapper>
            )}
        </Wrapper>
    )
}

export default Search
