import { useEffect, useRef } from "react";
import useStore from "../../store";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 65vh;
  min-width: 400px;
  overflow-y: scroll;
  margin-bottom: 4rem;

  @media (max-height: 650px) {
    height: 55vh;
  }
`;

const Lyric = styled.p`
  font-size: 2.4rem;
  padding-block: 1rem;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #d4d4d4 !important;
  }
`;

function LyricsScroll() {
  const { Lyrics: {lyrics}, Player: {timestamp, setLyricsSeek, setLyricsScrolled} } = useStore();
  const WrapperRef = useRef(null);
  const lyricsRef = useRef([]);


  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setLyricsScrolled(false);
      }, 5000);
    };

    function onScroll() {
      resetTimer();
    }

    const wrapperElement = WrapperRef.current;

    if (wrapperElement) {
      wrapperElement.addEventListener("scroll", onScroll);
    }

    resetTimer();


    // Scroll to center
    const currentLyricCount = Object.values(lyrics).filter(
      (lyric) => lyric.time <= timestamp
    ).length;

    let height = 0
    for (let i = 0; i < currentLyricCount; i++) {
      const currentLyricEl = lyricsRef.current[i];
      height += currentLyricEl?.offsetHeight;
    }

    WrapperRef.current.scrollTop = height - WrapperRef.current.clientHeight / 2;

    return () => {
      clearTimeout(timer);
      if (wrapperElement) {
        wrapperElement.removeEventListener("scroll", onScroll);
      }
    };
  }, [WrapperRef]);

  return (
    <Wrapper ref={WrapperRef}>
      {lyrics && Object.values(lyrics).map((lyric, index) => {
        return (
          <Lyric
            key={index}
            ref={(el) => (lyricsRef.current[index] = el)}
            onClick={() => setLyricsSeek(lyric.time)}
            style={{ color: lyric.time >= timestamp ? "gray" : "white" }}
          >
            {lyric.text}
          </Lyric>
        );
      })}
    </Wrapper>
  );
}

export default LyricsScroll;
