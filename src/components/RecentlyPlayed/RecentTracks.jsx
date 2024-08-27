import styled from "styled-components"
import Subheader from "../Global/Subheader"
import useStore from "../../store"
import Track from "../Global/Track";
import useMusicFetcher from "../../services/musicFetcher";
import useLyricsFetcher from "../../services/lyricsFetcher";
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
    /* padding-inline: 3rem; */
    margin-bottom: 2rem;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

function RecentTracks() {
    const {RecentlyPlayed: {tracks}} = useStore();
    const tracksRef = useRef([]);

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
            <Subheader ref={el => tracksRef.current[0] = el}>{Object.values(tracks).length > 0 ? "TRACKS" : "NO RECENTS"}</Subheader>
            <Column>
            {tracks && Object.values(tracks).map((track,index) => {
                return <Track ref={(el) => (tracksRef.current[index+1] = el)} key={track?.trackID} index={index}
                image={track?.image} id={track?.trackID} title={track?.trackName} artists={track?.artists} duration={track?.duration} albumID={track?.albumID} albumName={track?.albumName} artistID={track?.artists.length > 1 ? track?.artists[0].id : track?.artists.id} trackToSet={tracks} />
            })}
            </Column>
        </Wrapper>
    )
}

export default RecentTracks
