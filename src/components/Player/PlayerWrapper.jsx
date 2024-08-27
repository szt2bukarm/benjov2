import { useEffect, useMemo, useRef, useState } from "react";
import useStore from "../../store";
import Player from "./Player"
import { extractColors } from 'extract-colors'
import styled from 'styled-components'
import Lyrics from "./Lyrics";
import LyricsScroll from "./LyricsScroll";
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import '../../transitions.css'
import LyricsWrapper from "./LyricsWrapper";
import TrackOrder from "./TrackOrder";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import MainView from "./MainView";
import CorrectTrack from "./CorrectTrack";


const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    transition: background 0.2s;
`

const Shadow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#000000c9,#000000ed);
    z-index: 0;
    transition: opacity .3s;
`

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-inline: 5rem;
    text-align: center;
    z-index: 1;
`





function PlayerWrapper() {
    const {Music: {image,artist,title,duration,album},Lyrics: {showLyrics},TrackOrder: {showTrackOrder}, TrackCorrection: {showCorrection}} = useStore();
    const [colors,setColors] = useState([])
    const { fetchMusicData } = useMusicFetcher();
    const { fetchLyricsData } = useLyricsFetcher();
    let currentTab;

    const getCurrentTab = () => {
        if (showTrackOrder) {
            return <TrackOrder/>
        } else if (showLyrics) {
            return <LyricsWrapper/>
        } else if (showCorrection) {
            return <CorrectTrack />
        } else {
            return <MainView />
        }
    }

    currentTab = useMemo(() => getCurrentTab(), [showLyrics, showTrackOrder, showCorrection,image,artist,title]);    

    useEffect(() => {
        try {
            const fetchAndExtractColors = async () => {
                const response = await fetch(image, { mode: 'cors' });
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
        
                const extractedColors = await extractColors(imageUrl);
                URL.revokeObjectURL(imageUrl);
                setColors(extractedColors.sort((a, b) => b.area - a.area));
            };
            fetchAndExtractColors();
        } catch (error) {}
    
      }, [image]);

    useEffect(() => {
        if (!album && !artist && !title && !duration) return;
        fetchMusicData(
            album,artist,title,duration
          );
        fetchLyricsData(
            album,artist,title,duration
          );
    },[album,artist,title,duration]);

    return (
        <Wrapper style={{backgroundColor: (colors.length > 1 && colors[1] && colors[1].hex) || (colors[0] && colors[0].hex)}}>
            <Shadow style={{opacity: showLyrics || showTrackOrder || showCorrection ? 1 : 0.7}}/>
            <PlayerContainer>

            <TransitionGroup>
                <CSSTransition
                    key={showTrackOrder ? 'showTrackOrder' : (showLyrics ? 'showLyrics' : showCorrection ? 'showCorrection' : 'showMainView')}
                    timeout={200}
                    classNames="fade"
                >
                {!currentTab ? (
                    <MainView />
                    )
                : currentTab}
                </CSSTransition>
            </TransitionGroup>

            <Player/>
            </PlayerContainer>
        </Wrapper>
    )
}

export default PlayerWrapper
