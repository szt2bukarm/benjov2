import { useEffect, useRef, useState } from "react";
import { CSSTransition,TransitionGroup } from "react-transition-group";
import useStore from "../../store";
import gsap from "gsap";
import styled from "styled-components";
import Loader from "./Loader";

const Wrapper = styled.div`
  height: 65vh;
  min-width: 400px;
  overflow-y: scroll;
  margin-bottom: 4rem;
  transition: padding-top 1s;

  @media (max-height: 650px) {
    height: 55vh;
  }
`;

const Lyric = styled.p`
  color: #fff;
  font-size: 3.2rem;
  cursor: default;
  transition: margin 0.3s, font-size 0.3s, color 0.3s;
`;


function Lyrics() {
  const lyricsRef = useRef([]);
  const WrapperRef = useRef(null);
  const {
    Music: {searching},
    Lyrics: {lyrics},
    Player: {
      timestamp,
      setLyricsScrolled,
    }
  } = useStore();
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    function onScroll() {
      setLyricsScrolled(true);
    }

    WrapperRef.current?.addEventListener("scroll", onScroll);
    return () => {
      WrapperRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [WrapperRef]);

  useEffect(() => {
    try {
      const animateLyrics = () => {
        if (lyrics && Object.values(lyrics).length > 0) {
          let newOffset = 0;
          const currentLyricCount = Object.values(lyrics).filter(
            (lyric) => lyric.time <= timestamp
          ).length;
  
          for (let i = 0; i < currentLyricCount; i++) {
            const currentLyricEl = lyricsRef.current[i];
            const lyricHeight = currentLyricEl?.offsetHeight;
            newOffset -= lyricHeight;
            setPadding(lyricHeight);
          }
  
          gsap.to(lyricsRef.current.slice(0, currentLyricCount), {
            y: newOffset,
            duration: 1,
            ease: "power3.out",
          });
  
          gsap.to(lyricsRef.current.slice(currentLyricCount), {
            y: newOffset,
            stagger: 0.02,
            duration: 1,
            ease: "power3.out",
          });
        }
      };
  
      if (lyrics != null) animateLyrics();
    } catch (error) {}
  }, [timestamp, lyrics]);


  if(lyrics) {
    if(Object.values(lyrics)[0] == "")
    return <Lyric>No lyrics available</Lyric>
  }

  return (
    <Wrapper ref={WrapperRef} style={{ paddingTop: `${padding}px` }}>
      {lyrics && !searching ? (
        Object.values(lyrics).map((lyric, index) => (
          <Lyric
            key={index}
            ref={(el) => (lyricsRef.current[index] = el)}
            style={{
              color: lyric.time >= timestamp ? "gray" : "white",
              marginBlock: lyric.time >= timestamp ? "1.5rem" : "0",
              filter: lyric.time >= timestamp ? "blur(2px)" : "blur(0px)",
            }}
          >
            {lyric.text}
          </Lyric>
        ))
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
}

export default Lyrics;
