import useStore from "../../store"
import styled from "styled-components";
import Track from "../Global/Track";
import Subheader from "../Global/Subheader";
import Loader from "../Player/Loader";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";

const Wrapper = styled.div`
    /* padding-inline: 3rem; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    margin-bottom: 2rem;
`

const Return = styled(Subheader)`
    transition: all 200ms;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
        color: white;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`


function GenreTracks() {
    const {Genres: {tracks,selectedGenre,setTracksOpen,tracksLoading}} = useStore();
    const tracksRef = useRef([])


    useEffect(() => {
        gsap.set([tracksRef.current] , {
            opacity: 0,
            y: 25,
        })
        gsap.to([tracksRef.current] , {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power3.out",
        })
    },[tracks])

    return (
        <Wrapper>
            {tracksLoading ? <Loader /> : (
                    <div style={{paddingInline: "3rem"}}>
                    <Return onClick={() => setTracksOpen(false)}>{"< " + selectedGenre.toUpperCase()}</Return>
                    <Column>
                        {tracks && Object.values(tracks).map((track,index) => {
                            return ( <Track ref={(el) => (tracksRef.current[index] = el)} key={track?.trackID} index={index} 
                             image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={tracks}/>)
                            })}
                    </Column>
                    </div>
                )}
        </Wrapper>
    )
}

export default GenreTracks
