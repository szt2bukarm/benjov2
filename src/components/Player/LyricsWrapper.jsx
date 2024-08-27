import { TransitionGroup, CSSTransition } from "react-transition-group"
import useStore from "../../store";
import LyricsScroll from "./LyricsScroll";
import Lyrics from "./Lyrics";
import styled from "styled-components";
import LyricsViewTrackInfo from "./LyricsViewTrackInfo";

const Wrapper = styled.div`
    position: absolute;
    top: 15rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60rem;
    text-align: start;
    z-index: 1;
`

function LyricsWrapper() {
    const {Player: {lyricsScrolled}} = useStore();

    return (
        <TransitionGroup>
        <CSSTransition
            key={lyricsScrolled ? 'lyricsScroll' : 'lyrics'}
            timeout={300}
            classNames="fade"
        >
                <Wrapper>
                    <LyricsViewTrackInfo />
                    {lyricsScrolled ? <LyricsScroll /> : <Lyrics />}
                </Wrapper>
       </CSSTransition>
    </TransitionGroup>
)
}

export default LyricsWrapper
